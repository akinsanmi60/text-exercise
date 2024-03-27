import Header from './Header';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <Header />
      {children}
    </div>
  );
}

export default LayoutWrapper;
