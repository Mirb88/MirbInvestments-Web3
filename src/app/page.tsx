import ClientOnlyWrapper from '@/components/ClientOnlyWrapper';
import MainHomePage from './(main)/page';

export default function Page() {
  return (
    <ClientOnlyWrapper>
      <MainHomePage />
    </ClientOnlyWrapper>
  );
}
