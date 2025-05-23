import React, { useEffect, useState } from "react";

const JobForm = ({ onSave, initialData }) => {
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    date: new Date().toISOString().substr(0, 10),
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.position) {
      alert("Company and Position are required.");
      return;
    }
    onSave(form);
    setForm({
      company: "",
      position: "",
      status: "Applied",
      date: new Date().toISOString().substr(0, 10),
    });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
      />
      <input
        name="position"
        placeholder="Position"
        value={form.position}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <button type="submit">{form.id ? "Update" : "Add"} Job</button>
    </form>
  );
};

export default JobForm;
