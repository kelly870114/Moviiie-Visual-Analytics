import { React, useEffect, useState } from "react";
import {
 filter,
 IconButton,
 Input,
 InputGroup,
 InputLeftElement,
 useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import words from "variables/words";
import movieid from "variables/movieid";
export function SearchBar(props) {
 // Pass the computed styles into the `__css` prop
 const { variant, background, children, placeholder, borderRadius, ...rest } =
  props;
 // Chakra Color Mode
 const searchIconColor = useColorModeValue("gray.700", "white");
 const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
 const inputText = useColorModeValue("gray.700", "gray.100");
 const [searchInput, setSearchInput] = useState("");
 const [products, setProducts] = useState([]);
 const [filteredProducts, setFilteredProducts] = useState([]);
 const [movieName, setMovieName] = useState("");
 const [movieActors, setMovieActors] = useState([]);
 const [movieGenre, setMovieGenre] = useState("");
 const [cloud, setCloud] = useState([{ text: "", value: 0 }]);
 const [cloudResult, setcloudResult] = useState([{ text: "", value: 0 }]);
 const [movieRevenueNum, setMovieRevenueNum] = useState(0);
 const [movieRating, setMovieRating] = useState([0, 0, 0, 0]);
 const [movieSentiment, setMovieSentiment] = useState(-2);

 const fetchProducts = async () => {
  const { data } = await axios.get("http://127.0.0.1:5000/getMovieOverview");
  const products = data;
  setProducts(products);
  console.log(products);
 };
 useEffect(() => {
  fetchProducts();
 }, []);

 const handleChange = (e) => {
  e.preventDefault();
  const inputValue = e.target.value;
  setSearchInput(inputValue);
 };

 const handleClick = (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("searchInput").value;
  setSearchInput(inputValue);
  var movie_id = movieid[0][inputValue.toUpperCase()];
  const filteredData = products.filter((product) =>
   product.movie_name.toLowerCase().match(inputValue.toLowerCase())
  );
  setFilteredProducts(filteredData);

  // Get bar/radar chart data
  if (movie_id <= 38) {
   // Movie Information
   setMovieActors(filteredData[0].movie_actors);
   setMovieName(filteredData[0].movie_name);
   setMovieGenre(filteredData[0].movieGenre);
   props.onMovieNameChange(filteredData[0].movie_name);
   props.onMovieActorChange(filteredData[0].movie_actors);
   props.onMovieGenreChange(filteredData[0].movie_genre);
   // Bar
   var budgetnumber = parseInt(filteredData[0].movie_budget.replace(/,/g, ""));
   var revenuenumber = parseInt(
    filteredData[0].movie_revenue.replace(/,/g, "")
   );
   props.onMovieBudgetClick(budgetnumber, revenuenumber);
   // Radar
   var tomacritcs = parseInt(filteredData[0].movie_tomato_tomatometer);
   var tomaaudience = parseInt(filteredData[0].movie_tomato_audience);
   var imdbaudience = parseInt(filteredData[0].movie_imdb_rating);
   var imdbcritcs = parseInt(filteredData[0].movie_imdb_metascore);
   props.onMovieRatingClick([
    tomacritcs,
    tomaaudience,
    imdbaudience,
    imdbcritcs,
   ]);
   // Cloud
   const wordList = words[movie_id];
   setCloud(wordList);
   setcloudResult("");
   props.onMovieReviewClick(wordList);
   props.onMovieReviewResultClick("");
   // Sentiment
   var sentimentScore = parseFloat(filteredData[0].movie_sentiment_score);
   setMovieSentiment(sentimentScore);
   props.onMovieSentimentClick(sentimentScore);
  } else {
   setMovieName("");
   setMovieActors("");
   setMovieGenre("");
   props.onMovieNameChange("");
   props.onMovieActorChange("");
   props.onMovieGenreChange("");
   // Bar
   props.onMovieBudgetClick(1, 1);
   // Radar
   props.onMovieRatingClick([0, 0, 0, 0]);
   // Cloud
   setCloud([]);
   setcloudResult("");
   props.onMovieReviewClick([]);
   props.onMovieReviewResultClick("");
   // Sentiment
   setMovieSentiment(-2)
   props.onMovieSentimentClick(-2);
  }
 };

 return (
  <InputGroup w={{ base: "100%", md: "200px" }} {...rest}>
   <InputLeftElement
    children={
     <IconButton
      bg="inherit"
      borderRadius="inherit"
      _hover="none"
      _active={{
       bg: "inherit",
       transform: "none",
       borderColor: "transparent",
      }}
      _focus={{
       boxShadow: "none",
      }}
      icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
      onClick={handleClick}
     ></IconButton>
    }
   />
   <Input
    id="searchInput"
    variant="search"
    fontSize="sm"
    bg={background ? background : inputBg}
    color={inputText}
    fontWeight="500"
    _placeholder={{ color: "gray.400", fontSize: "14px" }}
    borderRadius={borderRadius ? borderRadius : "30px"}
    placeholder={placeholder ? placeholder : "Search..."}
    onChange={handleChange}
    value={searchInput}
   />
   {/* {filteredProducts.map((product) => (
    <div key={product.movie_name}>
     <h2>{product.movie_budget}</h2>
    </div>
   ))} */}

   {/* <MiniStatistics
     name="Movie Name"
     value={products.map((product) => (
      <p>{product.movie_name}</p>
     ))}
    /> */}
  </InputGroup>
 );
}
