export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-red-500 text-white font-bold p-3 text-center rounded-lg mb-2">
      {children}
    </div>
  );
};
