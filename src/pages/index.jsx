import { useState, useRef } from 'react';
import Card from '../components/card';
import ConvexHull from '../components/board';
import Footer from '@/components/footer';

export default function Home() {
      const [points, setPoints] = useState([]);
      const [hull, setHull] = useState([]);
      const [disabled, setDisabled] = useState(false);
      const [animationSpeed, setAnimationSpeed] = useState(500);
      const [isPaused, setIsPaused] = useState(false);
      const containerRef = useRef(null);

      const addPoint = (event) => {
            if (disabled) return;
            const rect = containerRef.current.getBoundingClientRect();
            const newPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top };
            setPoints([...points, newPoint]);
      };

      const computeHull = async () => {
            if (points.length < 3) return alert("At least 3 points are required!");
            setDisabled(true);
            setIsPaused(false);


            const response = await fetch('/api/convexHull', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ points })
            });

            if (response.ok) {
                  const data = await response.json();
                  setHull(data.hull);
            }
      };

      const clearScreen = () => {
            setPoints([]);
            setHull([]);
            setDisabled(false);
      };

      return (
            <div className="min-h-screen bg-gray-100 px-4 pt-4">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-blue-400">
                        Convex Hull Visualizer
                  </h1>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
                        <button
                              onClick={computeHull}
                              disabled={disabled}
                              className={`px-5 py-2 rounded-lg shadow-md transition ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                        >
                              Compute Convex Hull
                        </button>
                        <button
                              onClick={clearScreen}
                              className="px-5 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                        >
                              Clear Screen
                        </button>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-6 max-w-7xl pb-6  mx-auto">
                        <div className="max-w-full lg:w-64 flex flex-col gap-6 mx-4">
                              <Card
                                    title="Kunal Das"
                                    description="Computer Science and Engineering (2022-26)"
                                    borderColor="bg-blue-500"
                              />
                              <a href="https://github.com/Kunal25Das/Convex-Hull-Visualizer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                              >
                                    <Card
                                          title="GitHub Repository"
                                          description="Convex Hull Visualizer"
                                          borderColor="bg-purple-500"
                                    />
                              </a>
                        </div>

                        <div className="flex-grow flex justify-center">
                              <div
                                    ref={containerRef}
                                    className="border-2 border-black cursor-crosshair bg-white h-[68vh] w-full max-w-3xl relative overflow-hidden"
                                    onClick={addPoint}
                              >
                                    <ConvexHull points={points} hull={hull} />
                              </div>
                        </div>

                        <div className="w-full lg:w-64">
                              <div className="lg:sticky lg:top-6">
                                    <h2 className="text-lg text-black font-semibold mb-3">
                                          Convex Hull Points:
                                    </h2>
                                    <ul className="space-y-1">
                                          {hull.map((p, index) => (
                                                <li key={index} className="text-blue-600">
                                                      ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                                                </li>
                                          ))}
                                    </ul>
                              </div>
                        </div>
                  </div>
                  <Footer/>
            </div>
      );
}
