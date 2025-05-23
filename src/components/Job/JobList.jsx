const JobList = ({ jobs, onEdit, onDelete }) => {
  if (jobs.length === 0) {
    return (
      <p className="text-center text-gray-500">No job applications yet.</p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-white p-4 rounded shadow border">
          <h3 className="text-xl font-semibold">{job.position}</h3>
          <p className="text-gray-700">Company: {job.company}</p>
          <p className="text-gray-700">Status: {job.status}</p>
          <p className="text-gray-700">Date: {job.date}</p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => onEdit(job)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(job.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
