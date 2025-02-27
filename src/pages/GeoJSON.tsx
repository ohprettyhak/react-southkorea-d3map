import { GeoGeometryObjects, geoMercator, geoPath, json, select } from 'd3';
import { useEffect, useRef, useState } from 'react';

interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][] | number[][][];
  };
  properties: {
    name: string;
    base_year: string;
    name_eng: string;
    code: string;
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}

const [width, height] = [620, 488];

const GeoJSON = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const mapRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const projection = geoMercator()
      .center([127.7669, 35.9078])
      .scale(4000)
      .translate([(width - 75) / 2, height / 2]);

    const path = geoPath().projection(projection);

    const $map = select(mapRef.current);

    json<GeoJSONData>('https://raw.githubusercontent.com/ohprettyhak/react-southkorea-d3map/refs/heads/main/src/assets/skorea-provinces-2018-geo.json')
      .then((data) => {
        if (!data) return;

        $map
          .select('.regions')
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', (d) => path(d.geometry as GeoGeometryObjects))
          .attr('fill', 'var(--color-map-background)')
          .attr('stroke', 'var(--color-map-border)')
          .attr('stroke-opacity', 1)
          .attr('stroke-width', 1)
          .on('click', (event, d) => {
            $map
              .selectAll('.regions path')
              .attr('fill', 'var(--color-map-background)')
              .attr('stroke', 'var(--color-map-border)');

            select(event.currentTarget)
              .attr('fill', 'var(--color-map-selected-background)')
              .attr('stroke', 'var(--color-map-selected-border)');

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

export default GeoJSON;
