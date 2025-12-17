import React, { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !scheduledDate) return alert("Title and Date required");

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, scheduledDate }),
      });

      if (res.ok) {
        setTitle("");
        setScheduledDate("");
        fetchTasks();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add task");
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", fontFamily: "'Segoe UI', sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4a90e2", fontSize: "2.5rem", marginBottom: "30px" }}>
        DevTrack-Lite
      </h1>

      {/* Task Form */}
      <form
        onSubmit={handleAddTask}
        style={{
          display: "flex",
          marginBottom: "25px",
          gap: "12px",
          backgroundColor: "#fff",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            flex: 2,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "15px",
            transition: "0.3s",
          }}
        />
        <input
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "15px",
            transition: "0.3s",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#4a90e2",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#357ab7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
        >
          Add
        </button>
      </form>

      {/* Task List */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Loading tasks…</p>
      ) : tasks && tasks.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                backgroundColor: "#fff",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div>
                <strong style={{ fontSize: "1.1rem" }}>{task.title}</strong>
                <p style={{ margin: "5px 0 0", color: "#888" }}>{task.scheduledDate}</p>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#e94e77",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#d63f66")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#e94e77")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>No tasks found.</p>
      )}
    </div>
  );
}

export default Tasks;
