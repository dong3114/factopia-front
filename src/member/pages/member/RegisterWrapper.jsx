export default function FormWrapper({ children }) {
  return (
    <div className="flex flex-col items-center  min-h-screen w-full mt-10">
      <div className="w-1/3 max-w-[800px] min-w-[400px] p-6 border rounded-lg shadow-md bg-white">
        {children}
      </div>
    </div>
  );
}
