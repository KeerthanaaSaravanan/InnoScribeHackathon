import React from "react";
import { useParams } from "react-router-dom";

const ViewResources = () => {
  const { subject } = useParams();

  // Mock data for the uploaded files (replace these with actual file URLs or upload logic)
  const resources = {
    "english": {
      notes: [
        { title: "Unit 1 Notes", url: "/public/subject1_unit1.pdf" },
        { title: "Unit 2 Notes", url: "/public/subject1_unit2.pdf" },
      ],
      videos: [
        { title: "Unit 1 Video", url: "/public/subject1_video1.mp4" },
        { title: "Unit 2 Video", url: "/public/subject1_video2.mp4" },
      ],
    },
    "Math": {
      notes: [
        { title: "Unit 1 Notes", url: "/public/subject2_unit1.pdf" },
        { title: "Unit 2 Notes", url: "/public/subject2_unit2.pdf" },
      ],
      videos: [
        { title: "Unit 1 Video", url: "/public/subject2_video1.mp4" },
        { title: "Unit 2 Video", url: "/public/subject2_video2.mp4" },
      ],
    },
    "science": {
      notes: [
        { title: "Unit 1 Notes", url: "/public/subject3_unit1.pdf" },
        { title: "Unit 2 Notes", url: "/public/subject3_unit2.pdf" },
      ],
      videos: [
        { title: "Unit 1 Video", url: "/public/subject3_video1.mp4" },
        { title: "Unit 2 Video", url: "/public/subject3_video2.mp4" },
      ],
    },
    "social": {
      notes: [
        { title: "Unit 1 Notes", url: "/public/subject4_unit1.pdf" },
        { title: "Unit 2 Notes", url: "/public/subject4_unit2.pdf" },
      ],
      videos: [
        { title: "Unit 1 Video", url: "/public/subject4_video1.mp4" },
        { title: "Unit 2 Video", url: "/public/subject4_video2.mp4" },
      ],
    },
    "lifeskills": {
      notes: [
        { title: "Unit 1 Notes", url: "/public/subject5_unit1.pdf" },
        { title: "Unit 2 Notes", url: "/public/subject5_unit2.pdf" },
      ],
      videos: [
        { title: "Unit 1 Video", url: "/public/subject5_video1.mp4" },
        { title: "Unit 2 Video", url: "/public/subject5_video2.mp4" },
      ],
    },
  };

  // Get the notes and videos for the selected subject
  const subjectResources = resources[subject] || { notes: [], videos: [] };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "10",
          overflowY: "auto",
          height: "80vh",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "24px" }}>
          Resources for {subject.toUpperCase()}
        </h2>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Here you'll see all the uploaded notes and videos.
        </p>

        {/* Flex container for Notes and Videos */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
            marginBottom: "20px",
          }}
        >
          {/* Notes Section */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>View Notes</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {subjectResources.notes.map((note, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <a
                      href={note.url}
                      style={{
                        textDecoration: "none",
                        color: "#0090C1",
                        fontSize: "18px",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 {note.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Videos Section */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>View Videos</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {subjectResources.videos.map((video, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <a
                      href={video.url}
                      style={{
                        textDecoration: "none",
                        color: "#0090C1",
                        fontSize: "18px",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🎬 {video.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResources;
