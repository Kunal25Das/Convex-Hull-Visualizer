import { useState, useRef } from 'react';
import Card from '../components/card';
import ConvexHull from '../components/board';
import Footer from '@/components/footer';

export default function Home() {
      const [points, setPoints] = useState([]);
      const [hull, setHull] = useState([]);
      const [disabled, setDisabled] = useState(false);
      const [cancelDisabled, setCancelDisabled] = useState(true);
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
            setCancelDisabled(true);
      };

      return (
            <div className="min-h-screen bg-gray-100 px-4 pt-4">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-blue-400">
                        Convex Hull Visualizer
                  </h1>


                  <div className="flex flex-col lg:flex-row gap-6 max-w-7xl pb-6  mx-auto">
                        <div className="max-w-full lg:w-64 flex flex-col gap-6 mx-4">
                              <Card
                                    title="Instruction"
                                    description="📌 add points by clicking on the graph area"
                                    description1="🔴 red pionts are hull points"
                                    description2="🟣 purple points shows the current base point"
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
                                          description1=""
                                          description2=""
                                          borderColor="bg-purple-500"
                                    />
                              </a>
                        </div>

                        <div className="flex-grow flex flex-col justify-center space-y-3">
                              <div
                                    ref={containerRef}
                                    className="border-2 border-black cursor-crosshair bg-white h-[68vh] w-full max-w-3xl relative overflow-hidden"
                                    onClick={addPoint}
                              >
                                    <ConvexHull points={points} hull={hull} onAnimationEnd={() => setCancelDisabled(false)}/>
                              </div>
                              { ( !disabled || !cancelDisabled ) ?
                        (<div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
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
                                    disabled={cancelDisabled}
                                    className={`px-5 py-2  rounded-lg shadow-md transition ${cancelDisabled ? 'bg-gray-400 cursor-not-allowed' : ' bg-red-600 text-white hover:bg-red-700'
                                          }`}
                              >
                                    Clear Screen
                              </button>
                        </div>
                        ) :(
                              <div className="flex justify-center items-center mb-4">
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                                          <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                                          <span className="text-blue-500 font-semibold">Processing...</span>
                                    </div>
                              </div>
                        )
                  }
                        </div>

                        <div className="w-full lg:w-64">
                              <div className="lg:sticky lg:top-6">
                                    <h2 className="text-lg text-black font-semibold mb-3">
                                          Plotted Points:
                                    </h2>
                                    {/* Scrollable list container */}
                                    <div className="max-h-[60vh] overflow-y-auto  rounded-lg p-2">
                                    <ul className="space-y-1">
                                                {points.map((p, index) => {
                                                      // Check if (p.x, p.y) exists in hull by comparing values
                                                      const isHullPoint = hull.some(h => h.x === p.x && h.y === p.y);

                                                      return (
                                                            <li key={index} className={isHullPoint ? "text-red-600" : "text-blue-600"}>
                                                                  ({p.x.toFixed(2)}, {p.y.toFixed(2)})
                                                            </li>
                                                      );
                                                })}
                                          </ul>

                                    </div>
                              </div>
                        </div>
                  </div>
                  <Footer/>
            </div>
      );
}
