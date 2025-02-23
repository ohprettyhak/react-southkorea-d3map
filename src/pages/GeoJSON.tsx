import { GeoGeometryObjects, geoMercator, geoPath, json, select } from 'd3';
import { useEffect, useRef } from 'react';

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

const [width, height] = [560, 488];

const GeoJSON = () => {
  const mapRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = select(mapRef.current).attr('width', width).attr('height', height);

    const projection = geoMercator()
      .center([127.7669, 35.9078])
      .scale(4000)
      .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    json<GeoJSONData>('/assets/skorea-provinces-2018-geo.json')
      .then((data) => {
        if (!data) return;

        svg
          .selectAll<SVGPathElement, GeoJSONFeature>('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', (d) => pathGenerator(d.geometry as GeoGeometryObjects))
          .attr('fill', '#ccc')
          .attr('stroke', '#333')
          .attr('stroke-width', 1);
      })
      .catch((error) => {
        console.error('GeoJSON 데이터 로드 실패:', error);
      });
  }, []);

  return (
    <main data-animate={true}>
      <div className="map-container">
        <svg ref={mapRef} />
      </div>
    </main>
  );
};

export default GeoJSON;
