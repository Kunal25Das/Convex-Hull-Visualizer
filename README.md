# 🎨 **Convex Hull Visualizer** 🚀  

[![Made with Next.js](https://img.shields.io/badge/Made%20with-NextJs-61DAFB.svg)](https://nextjs.org/)  
[![Powered by JavaScript](https://img.shields.io/badge/Powered%20by-JavaScript-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)  

🔍 An interactive **Convex Hull Visualizer** built with **Next.js & React**, designed to help students understand the **Jarvis March (Gift Wrapping) algorithm**. It features an interactive **graph grid**, allowing users to dynamically add points, compute the convex hull, and reset the visualization.

<!-- ![Convex Hull Preview](/public/preview.png)   -->

---

## 🚀 **Features**
✅ 📍 **Click to Add Points** – Place points dynamically on the graph  
✅ 📈 **Compute Convex Hull** – Uses the **Jarvis March** algorithm  
✅ 👟 **Step-by-Step Visualization** – Watch the algorithm in action  
<!-- ✅ **🎧 Adjustable Animation Speed** – Control the speed from **0.5x to 4x**  ✅ **⏸️ Play/Pause Animation** – Stop and resume anytime   -->
✅ 📌 **Live Hull Points List** – View the points forming the convex hull  
✅ 🧹 **Reset Screen** – Start over with a clean board  
✅ ⚡**Responsive** – Works on **most devices**  
✅ 🎨 **UI** with **Next.js & TailwindCSS**  

---

## 🎮 **How to Use**
**1️⃣ Click anywhere on the graph area** to place points 🔵  
**2️⃣ Press "Compute Convex Hull"** to start the visualization 🚀  
**3️⃣ Watch the magic happen!** 🥣 Points are analyzed, 🟢 hull edges form, 🔴 final hull points are marked  
**4️⃣ Clear screen** and try again! 🪚  

---

## 🛠️ **Installation & Setup**
📦 **Prerequisites:**  
- 🖥️ Node.js (v14+ recommended)  
- 📦 npm or yarn  

### **1️⃣ Clone this repository**  
```sh
git clone https://github.com/Kunal25Das/Convex-Hull-Visualizer.git
cd convex-hull-visualizer
```

### **2️⃣ Install dependencies**  
```sh
npm install
# or
yarn install
```

### **3️⃣ Run the development server**  
```sh
npm run dev
# or
yarn dev
```

🔗 Open **[http://localhost:3000](http://localhost:3000)** in your browser!  

---

## 🎨 **Color Legend**
| **Color** | **Meaning** |
|-----------|------------|
| 🔵 **Blue** | Regular points |
| 🟣 **Purple** | Current base point |
| 🟢 **Green** | Hull edge being confirmed |
| 🔴 **Red** | Final convex hull points |

---

## 🧠 **How It Works (Jarvis March Algorithm)**
**1️⃣ Start with the leftmost point**  
**2️⃣ Find the most counterclockwise point** at each step  
**3️⃣ Continue wrapping around the points** until you return to the start  
**4️⃣ Boom! 🎉 Convex hull formed!**  

💡 **Fun Fact:** This algorithm runs in **O(nh) time complexity**, where **n** is the number of points, and **h** is the number of hull points.

---

## 🔧 **Tech Stack**
- **⚛️ Next.js** – Modern React framework  
- **🎨 Tailwind CSS** – Beautiful & responsive UI  
- **✒️ Canvas API** – For dynamic visualizations  
- **🎗️ FontAwesome** – Icons & styling  

---

## 🤝 **Contributing**
🎉 We welcome contributions! Want to add a feature or improve UI? Follow these steps:  

**1️⃣ Fork the repo** 🍔  
**2️⃣ Create a new branch** 🔄  
**3️⃣ Make changes & commit** 💾  
**4️⃣ Push and submit a PR** 🚀  

---

## 📩 **Connect with me 🤗**
💬 Have questions? Found a bug? Feel free to reach out!  

[📧 **Email**](mailto:dev.kunal.das@gmail.com)  
[🐦 **X**](https://x.com/_hit0ru_)  
[🧵 **Threads**](https://www.threads.net/@_.hitoru._)   
[🪇 **Instagram**][def] 

📌 **If you like this project, don’t forget to ⭐ star it on GitHub!** 🌟  

---

Made with ❤️ by **[Kunal Das](https://github.com/Kunal25Das)**  
🚀 **Happy Coding!** 🚀  


[def]: https://www.instagram.com/_.hitoru._/