export default function SearchBar({ searchTerm, handleSearchChange }) {
  return (
    <div className="my-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}
