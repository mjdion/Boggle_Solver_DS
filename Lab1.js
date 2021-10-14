/* References:
 * https://www.geeksforgeeks.org
 * Aster Smith
*/

exports.findAllSolutions = function(grid, dictionary) {
	let solutions = [];
	if (grid == null || dictionary == null){
		return solutions;
	}
    
	let gridlen = grid.length;
	for (let i=0; i<gridlen; i++){
		if (grid[i].length != gridlen){
			return solutions;
		}
	}
    
	convertToLowerCase(grid, dictionary); 
    
	if (!isTheGridValid(grid)){
		return solutions;
	}
	let hash = createHashMap(dictionary); 
	let solutionSet = new Set();
    
	for (let y=0; y<gridlen; y++){
		for (let x=0; x<gridlen; x++){
			let found_word = "";
			let visited = new Array(gridlen).fill(false).map(() => new Array(gridlen).fill(false));
			findWordsInGrid(found_word, y, x, grid, visited, hash, solutionSet); //recursive function call
		}
	}
	solutions = Array.from(solutionSet);
    
	return solutions;
    
	function convertToLowerCase(grid, dictionary){
		for (let i=0; i<grid.length; i++){
			for(let j=0; j<grid[i].length; j++){
				grid[i][j] = grid[i][j].toLowerCase();
			}
		}
       
		for (let i=0; i<dictionary.length; i++){
			dictionary[i] = dictionary[i].toLowerCase();
		}
	}
    
	function isTheGridValid(grid){
  
		let searchfor = /(st|qu) | [a-prt-z]/;
  
		for (let i=0; i < grid.length; i++){
			for (let j=0; j<grid[i].length; j++){
  
				if(!grid[i][j].match(searchfor)){
					return solutions;
				}
			}
		}
		return grid;
	} 
    
	function findWordsInGrid(found_word, y, x, grid, visited, hash, solutionSet){
		let adjMatrix = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1, -1], [0, -1]];
     
		if(found_word == "s" || found_word == "q"){
        
			return;
		}
      
		if (y<0 || x<0 || y>=grid.length || x>=grid.length || visited[y][x] == true){
			return;
		}
      
		found_word += grid[y][x];
      
		if (isPrefix(found_word, hash)){
			visited[y][x] = true;
        
			if (is_Word(found_word, hash)){
				if (found_word.length >= 3){
					solutionSet.add(found_word);
				}
			}
        
			for (let i=0; i<8; i++){
				findWordsInGrid(found_word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet);
			} 
		}
      
		visited[y][x] = false;
    
	}
    
    
	function isPrefix(found_word, hash){
		return hash[found_word] != undefined;
	}
    
	function is_Word(found_word, hash){
		return hash[found_word] == 1;
	}
    
    
	function createHashMap(dictionary){
  
		var hashdict = {};
		for (let i=0; i<dictionary.length; i++){
			hashdict[dictionary[i]] = 1;
			let wordlength = dictionary[i].length;
			var hashstr = dictionary[i];
  
			for (wordlength; wordlength > 1; wordlength--){
				
				hashstr = hashstr.substr(0, wordlength-1);
				if (hashstr in hashdict){
					if (hashstr == 1){
						hashdict[hashstr] = 1;
					}
				}
				else{
  
					hashdict[hashstr] = 0;
				}
			}
		}
		return hashdict;
	}
    
}; 
  
var grid = [["T", "W", "Y", "R"],
	["E", "N", "U", "E"],
	["G", "Z", "Q", "B"],
	["O", "N", "T", "E"]];
  
var dictionary = ["querbe", "ego", "gent", "get", "net", "new", "newt", "prat",
	"pry", "qua", "quart", "quartz", "rat", "tar", "tarp",
	"ten", "went", "wet", "arty", "egg", "not", "quar"];
  
console.log("These words were found in the boggle grid\n");
  
  
  
console.log(exports.findAllSolutions(grid, dictionary));







