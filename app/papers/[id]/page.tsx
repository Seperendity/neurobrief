import { paperLibrary } from '../../paper-library';
import PaperReaderPage from './reader';

export function generateStaticParams() {
  return paperLibrary.map(({ id }) => ({ id }));
}

export default function Page() {
  return <PaperReaderPage />;
}
