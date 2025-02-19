export default function Card({ title, description, borderColor }) {
      return (
          <div className="w-72 bg-gray-200 text-gray-800 p-4 rounded-xl shadow-lg transition hover:shadow-xl relative">
              <div className={`absolute left-0 top-2 bottom-2 w-1 ${borderColor} rounded-full`}></div>
              <div className="pl-4">
                  <h3 className="text-blue-600 font-semibold text-lg">{title}</h3>
                  <p className="text-gray-600 text-sm">{description}</p>
              </div>
          </div>
      );
  }
  