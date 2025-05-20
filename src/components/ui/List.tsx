import { motion } from 'framer-motion'

const List = () => {
  const stores = [
    {
      _id: "6823ca1904a829f3cdcd2127",
      name: "My favourite Book",
      address: "www.google.com",
      phoneno: 123456789,
      Descrption: "medical",
      imageUrl: "https://media.istockphoto.com/id/1214416844/photo/phamany-pills-and-capsule-rmaceuticals-antibiotics-pills-medicine-colorful-antibacterials.webp?a=1&s=612x612&w=0&k=20&c=RaXuaRjBBwNhivMKAk4C2yTpK9oq7OfmEq1BSY6EHZQ=",
    },
    {
      _id: "682b4274057ef0fb52233325",
      name: "rita medical Hall",
      address: "www.google.com",
      phoneno: 123456789,
      Descrption: "medical",
      imageUrl: "https://scontent.fixb1-1.fna.fbcdn.net/v/t39.30808-6/497620651_625106427245383_7675037143642641424_n.jpg",
    },
    {
      _id: "682b4274057ef0fb52233327",
      name: "Gita medical Hall",
      address: "www.google.com",
      phoneno: 123456789,
      Descrption: "medical",
      imageUrl: "https://scontent.fixb1-1.fna.fbcdn.net/v/t39.30808-6/497620651_625106427245383_7675037143642641424_n.jpg",
    },
    {
      _id: "682b4283057ef0fb52233329",
      name: "",
      address: "",
      phoneno: 0,
      Descrption: "medical",
      imageUrl: "",
    },
  ];

  const handleUpdate = (id: string) => {
    console.log("Update:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
    <ul>
      {stores.map((store) => (
        <motion.li key={store._id} className="border border-white rounded-lg ">
          <p><strong>Name:</strong> {store.name || "N/A"}</p>
          <p><strong>Address:</strong> {store.address || "N/A"}</p>
          <p><strong>Phone:</strong> {store.phoneno || "N/A"}</p>
          <p><strong>Description:</strong> {store.Descrption || "N/A"}</p>
          <button onClick={() => handleUpdate(store._id)} style={{ marginRight: "1rem" }}>Update</button>
          <button onClick={() => handleDelete(store._id)}>Delete</button>
        </motion.li>
      ))}
    </ul>
  );
};

export default List;