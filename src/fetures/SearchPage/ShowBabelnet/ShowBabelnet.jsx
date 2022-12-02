import { useSelector } from 'react-redux';
import { SortedByPos } from './SortedByPos';

export function ShowBabelnet() {
  const data = useSelector((state) => state.dicts.babelnet);
  if (!data) { return null; }
  return (
    <div>
      <SortedByPos/>
    </div>
  );
}