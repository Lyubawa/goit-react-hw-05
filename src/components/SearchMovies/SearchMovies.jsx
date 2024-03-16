// import { useSearchParams } from 'react-router-dom';

// export default function SearchMovies() {
//   const [params, setParams] = useSearchParams();
//   const value = params.get('query') ?? '';
//   const changeFilter = newFilter => {
//     params.set('query', newFilter);
//     setParams(params);
//   };
//   const handleSubmit = event => {
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="enter title of movie"
//           value={value}
//           onChange={e => changeFilter(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>
//     </div>
//   );
// }
