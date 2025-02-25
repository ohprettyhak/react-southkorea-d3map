import { Link } from 'react-router-dom';

const Gate = () => {
  return (
    <main data-animate={true}>
      <Link to="/GeoJSON">Geo JSON</Link>
      <Link to="/TopoJSON">Topo JSON</Link>
    </main>
  );
};

export default Gate;
