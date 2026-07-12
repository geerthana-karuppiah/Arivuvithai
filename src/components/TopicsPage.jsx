export default function TopicsPage({ language }) {
  const topics = {
    java: [
      "Variables",
      "Data Types",
      "Operators",
      "If Else",
      "Loops"
    ]
  };

  return (
    <div>
      <h1>{language.toUpperCase()} Topics</h1>

      {topics[language]?.map((topic) => (
        <div key={topic}>
          {topic}
        </div>
      ))}
    </div>
  );
}