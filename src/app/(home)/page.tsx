import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/docs/get-started/overview');
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      
    </div>
  );
}
