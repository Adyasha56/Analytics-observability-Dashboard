export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-100 flex flex-col ${className}`}>
      {title && (
        <h2 className="text-lg font-bold text-gray-800 px-6 pt-6 pb-4">{title}</h2>
      )}
      <div className="flex-1 px-6 pb-6 overflow-hidden">
        {children}
      </div>
    </div>
  );
}