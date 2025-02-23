import { Link } from 'react-router-dom';

const Gate = () => {
  return (
    <main data-animate={true}>
      <Link to="/geojson">Geo JSON</Link>
      <Link to="/topojson">Topo JSON</Link>
    </main>
  );
};

export default Gate;
