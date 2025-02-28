import { type GeoGeometryObjects, geoMercator, geoPath, json, select } from 'd3';
import { FeatureCollection, Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import * as topojson from 'topojson-client';
import { type Topology } from 'topojson-specification';

const [width, height] = [620, 488];

const TopoJSON = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const mapRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const $map = select(mapRef.current);

    json<Topology>(
      'https://raw.githubusercontent.com/ohprettyhak/react-southkorea-d3map/refs/heads/main/src/assets/skorea-provinces-2018-topo-simple.json',
    )
      .then((data) => {
        if (!data) return;

        const topologyData = topojson.feature(
          data,
          data.objects['skorea_provinces_2018_geo'],
        ) as FeatureCollection;

        const projection = geoMercator().fitSize([width, height], topologyData);
        const path = geoPath().projection(projection);

        $map
          .select('.regions')
          .selectAll('path')
          .data(topologyData.features)
          .join('path')
          .attr('d', (d: Feature) => path(d.geometry as GeoGeometryObjects))
          .attr('fill', 'var(--color-map-background)')
          .attr('stroke', 'var(--color-map-border)')
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 1)
          .style('cursor', 'pointer')
          .style('transition', 'fill 0.3s, stroke 0.3s')
          .on('click', (event, d: Feature) => {
            $map
              .selectAll('.regions path')
              .attr('fill', 'var(--color-map-background)')
              .attr('stroke', 'var(--color-map-border)');

            select(event.currentTarget)
              .attr('fill', 'var(--color-map-background-select)')
              .attr('stroke', 'var(--color-map-border-select)');

            const regionName: string = d.properties ? d.properties.name : 'unknown';
            setSelectedRegion(regionName);
          });
      })
      .catch((error) => {
        console.error('Failed to load JSON data:', error);
      });
  }, []);

  return (
    <main data-animate={true}>
      <div className="map-container">
        <svg
          ref={mapRef}
          width="100%"
          height="100%"
          viewBox={`50 0 ${width - 150} ${height}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="regions" />
        </svg>
      </div>

      <p className="selected-region">
        {selectedRegion && 'Selected Region:'}&nbsp;
        {selectedRegion}
      </p>
    </main>
  );
};

export default TopoJSON;
