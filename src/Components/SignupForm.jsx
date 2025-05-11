import React, { useState } from "react";

export const SignupForm = () => {
  const [formData, setFormData] = useState({ name: "", number: "" });
  const [ name, setName ] = useState("")
  const [ number, setNumber ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ address, setAddress ] = useState("")


  const [ errors, setErrors ]= useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: "", number: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="">
        <label className="">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
        <div className="">
        <label className="">Number</label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
      </div>
        <div className="">
        <label className="">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
        <div className="">
        <label className="">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="">
        Submit
      </button>
    </form>
  );
};
