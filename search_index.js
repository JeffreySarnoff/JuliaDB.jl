var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": "CurrentModule = JuliaDB"
},

{
    "location": "index.html#JuliaDB.jl-1",
    "page": "Introduction",
    "title": "JuliaDB.jl",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Overview-1",
    "page": "Introduction",
    "title": "Overview",
    "category": "section",
    "text": "The JuliaDB package provides a distributed table data structure where some of the columns form a sorted index. This structure is equivalent to an N-dimensional sparse array, and follows the array API to the extent possible. While a table data structure provided by JuliaDB can be used for any kind of array data, it is highly efficient at the storage and querying of data sets whose indices have a natural sorted order, such as time-series data.The JuliaDB package provides functionality for ingesting data from a variety of data sources, and provides full integration with the rest of the Julia language ecosystem for performing analytics directly on data stored within a JuliaDB table using many Julia processes."
},

{
    "location": "index.html#Installation-1",
    "page": "Introduction",
    "title": "Installation",
    "category": "section",
    "text": "Pkg.clone(\"https://github.com/JuliaComputing/JuliaDB.jl.git\")"
},

{
    "location": "index.html#Introduction-1",
    "page": "Introduction",
    "title": "Introduction",
    "category": "section",
    "text": "The data structure (called DTable) provided by this package maps tuples of indices to data values.   Hence, it is similar to a hash table mapping tuples to values, but with a few key differences. First, the index tuples are stored columnwise, with one vector per index position: there is a vector of first indices, a vector of second indices, and so on. The index vectors are expected to be homogeneous to allow more efficient storage. Second, the indices must have a total order, and are stored lexicographically sorted (first by the first index, then by the second index, and so on, left-to-right). While the indices must have totally-ordered types, the data values can be anything. Finally, for purposes of many operations an DTable acts like an N-dimensional array of its data values, where the number of dimensions is the number of index columns.  A DTable implements a distributed memory version of the IndexedTable data structure provided by the IndexedTables.jl package and re-exported by JuliaDB."
},

{
    "location": "tutorial.html#",
    "page": "Tutorial",
    "title": "Tutorial",
    "category": "page",
    "text": "CurrentModule = JuliaDB"
},

{
    "location": "tutorial.html#Using-JuliaDB-1",
    "page": "Tutorial",
    "title": "Using JuliaDB",
    "category": "section",
    "text": ""
},

{
    "location": "tutorial.html#Construction-of-an-IndexedTable-1",
    "page": "Tutorial",
    "title": "Construction of an IndexedTable",
    "category": "section",
    "text": "The IndexedTable constructor accepts a series of vectors. The last vector contains the data values, and the first N vectors contain the indices for each of the N dimensions. As an example, let's construct an array of the high temperatures for three days in two cities:using IndexedTables, JuliaDB\nhitemps = IndexedTable([fill(\"New York\",3); fill(\"Boston\",3)],\n                       repmat(Date(2016,7,6):Date(2016,7,8), 2),\n                       [91,89,91,95,83,76])Notice that the data was sorted first by city name, then date, giving a different order than we initially provided. On construction, IndexedTable takes ownership of the columns and sorts them in place (the original vectors are modified)."
},

{
    "location": "tutorial.html#Conversion-of-a-Local-IndexedTable-to-a-distributed-JuliaDB-Table-1",
    "page": "Tutorial",
    "title": "Conversion of a Local IndexedTable to a distributed JuliaDB Table",
    "category": "section",
    "text": "One can convert an existing IndexedTable to a JuliaDB DTable through the use of the distribute function.dhitemps = distribute(hitemps, 2)The first argument provided to distribute is an existing IndexedTable and the second argument describes how the indexed table should be distributed amongst worker processes.  If the second argument is a scalar of value n, then the IndexedTable will be split into n approximately equal chunks across the worker processes.  If the second argument is a vector of n integers, then the distributed table with n separate chunks with each chunk having the number of rows present in each element of that vector."
},

{
    "location": "tutorial.html#Importing-data-1",
    "page": "Tutorial",
    "title": "Importing data",
    "category": "section",
    "text": ""
},

{
    "location": "tutorial.html#JuliaDB.ingest",
    "page": "Tutorial",
    "title": "JuliaDB.ingest",
    "category": "Function",
    "text": "ingest(files::Union{AbstractVector,String}, outputdir::AbstractString; <options>...)\n\ningests data from CSV files into JuliaDB. Stores the metadata and index in a directory outputdir. Creates outputdir if it doesn't exist.\n\nArguments:\n\ndelim::Char: the delimiter to use to read the text file with data. defaults to ,\nindexcols::AbstractArray: columns that are meant to act as the index for the table.  Defaults to all but the last column. If datacols is set, defaults to all  columns other than the data columns. If indexcols is an empty vector,  an implicit index of itegers 1:n is added to the data.\ndatacols::AbstractArray: columns that are meant to act as the data for the table.  Defaults to the last column. If indexcols is set, defaults to all  columns other than the index columns.\nagg::Function: aggregation function to use to combine data points with the same index. Defaults to nothing which leaves the data unaggregated (see aggregate to aggregate post-loading)).  table.)\npresorted::Bool: specifies if each CSV file is internally already sorted according  to the specified index column. This will avoid a re-sorting.\ntomemory::Bool: Load data to memory after ingesting instead of mmapping. Defaults to false.\nThe rest of the keyword arguments will be passed on to TextParse.csvread which is used by this function to load data from individual files.\n\nSee also loadfiles and save\n\n\n\n"
},

{
    "location": "tutorial.html#JuliaDB.loadfiles",
    "page": "Tutorial",
    "title": "JuliaDB.loadfiles",
    "category": "Function",
    "text": "loadfiles(files::Union{AbstractVector,String}, delim = ','; <options>)\n\nLoad a collection of CSV files into a DTable, where files is either a vector of file paths, or the path of a directory containing files to load.\n\nArguments:\n\nusecache::Bool: use cached metadata from previous loads while loading the files. Set this to false if you are changing other options.\n\nAll other arguments options are the same as those listed in ingest.\n\nSee also ingest.\n\n\n\n"
},

{
    "location": "tutorial.html#JuliaDB.ingest!",
    "page": "Tutorial",
    "title": "JuliaDB.ingest!",
    "category": "Function",
    "text": "ingest!(files::Union{AbstractVector,String}, outputdir::AbstractString; <options>...)\n\ningest data from files and append into data stored in outputdir. Creates outputdir if it doesn't exist. Arguments are the same as those to ingest. The index range of data in the new files should not overlap with files previously ingested.\n\nSee also ingest\n\n\n\n"
},

{
    "location": "tutorial.html#Reading-from-CSV-files-1",
    "page": "Tutorial",
    "title": "Reading from CSV files",
    "category": "section",
    "text": "Importing data from column-based sources is straightforward.  JuliaDB currently provides two distinct methods for importing data: loadfiles and ingest.  Both functions load the contents of one or more CSV files in a given directory and return a DTable of the loaded data.  The ingest function has the additional property of transforming the data into an efficient internal storage format, and saving both the original data and associated JuliaDB metadata to disk in a provided output directory.The argument signature and help for ingest is the following:ingestThe argument signature and help for loadfiles is the following:loadfilesAs stated above in the help text, each function has a set of optional input arguments that are specific to that particular function, as well as the ability to pass a set of trailing input arguments that are subsequently passed on to TextParse.csvread.An in-place variant of the ingest! function will append data from new files on to an existing DTable stored in a defined outputdir.  The help string for the in-place version of ingest! is the following:ingest!"
},

{
    "location": "tutorial.html#JuliaDB.save",
    "page": "Tutorial",
    "title": "JuliaDB.save",
    "category": "Function",
    "text": "save(t::DTable, outputdir::AbstractString)\n\nSaves a DTable to disk. This function blocks till all files data has been computed and saved. Saved data can be loaded with load.\n\nSee also ingest, load\n\n\n\n"
},

{
    "location": "tutorial.html#JuliaDB.load",
    "page": "Tutorial",
    "title": "JuliaDB.load",
    "category": "Function",
    "text": "load(dir::AbstractString; tomemory)\n\nLoad a saved DTable from dir directory. Data can be saved using ingest or save functions. If tomemory option is true, then data is loaded into memory rather than mmapped.\n\nSee also ingest, save\n\n\n\n"
},

{
    "location": "tutorial.html#Saving-and-Loading-existing-JuliaDB-DTables-1",
    "page": "Tutorial",
    "title": "Saving and Loading existing JuliaDB DTables",
    "category": "section",
    "text": "Saving an existing DTable can be accomplished through the use of the save function.  The save function has the following help string:saveLoading a previously saved DTable from disk can be accomplished through use of the load function.  The load function has the following help string:load"
},

{
    "location": "tutorial.html#Indexing-1",
    "page": "Tutorial",
    "title": "Indexing",
    "category": "section",
    "text": "Most lookup and filtering operations on DTable are done via indexing. Our dhitemps array behaves like a 2-d array of integers, accepting two indices:dhitemps[\"Boston\", Date(2016,7,8)]If the given indices exactly match the element types of the index columns, then the result is a scalar. In other cases, a new DTable is returned, giving data for all matching locations:dhitemps[\"Boston\", :]"
},

{
    "location": "tutorial.html#Permuting-dimensions-1",
    "page": "Tutorial",
    "title": "Permuting dimensions",
    "category": "section",
    "text": "As with other multi-dimensional arrays, dimensions can be permuted to change the sort order. With DTable the interpretation of this operation is especially natural: simply imagine passing the index columns to the constructor in a different order, and repeating the sorting process:permutedims(dhitemps, [2, 1])Now the data is sorted first by date. In some cases such dimension permutations are needed for performance. The leftmost column is esssentially the primary key –- indexing is fastest in this dimension."
},

{
    "location": "tutorial.html#Select-and-aggregate-1",
    "page": "Tutorial",
    "title": "Select and aggregate",
    "category": "section",
    "text": "In some cases one wants to consider a subset of dimensions, for example when producing a simplified summary of data. This can be done by passing dimension (column) numbers (or names, as symbols) to select:select(dhitemps, 2)In this case, the result has multiple values for some indices, and so does not fully behave like a normal array anymore. Operations that might leave the array in such a state accept the keyword argument agg, a function to use to combine all values associated with the same indices:select(dhitemps, 2, agg=max)The aggregation operation can also be done by itself, in-place, using the function aggregate!.select also supports filtering columns with arbitrary predicates, by passing column=>predicate pairs:select(dhitemps, 2=>Dates.isfriday)"
},

{
    "location": "tutorial.html#Converting-dimensions-1",
    "page": "Tutorial",
    "title": "Converting dimensions",
    "category": "section",
    "text": "A location in the coordinate space of an array often has multiple possible descriptions. This is especially common when describing data at different levels of detail. For example, a point in time can be expressed at the level of seconds, minutes, or hours. In our toy temperature dataset, we might want to look at monthly instead of daily highs.This can be accomplished using the convertdim function. It accepts a DTable, a dimension number to convert, a function or dictionary to apply to indices in that dimension, and an aggregation function (the aggregation function is needed in case the mapping is many-to-one). The following call therefore gives monthly high temperatures:convertdim(dhitemps, 2, Dates.month, agg=max)"
},

{
    "location": "tutorial.html#Named-columns-1",
    "page": "Tutorial",
    "title": "Named columns",
    "category": "section",
    "text": "DTable and IndexedTable are built on a simpler data structure called Columns that groups a set of vectors together. This structure is used to store the index part of an IndexedTable, and a IndexedTable can be constructed by passing one of these objects directly. Columns allows names to be associated with its constituent vectors. Together, these features allow IndexedTable and DTable arrays with named dimensions:hitemps = IndexedTable(Columns(city = [fill(\"New York\",3); fill(\"Boston\",3)],\n                               date = repmat(Date(2016,7,6):Date(2016,7,8), 2)),\n                               [91,89,91,95,83,76])\ndhitemps = distribute(hitemps,2)Now dimensions (e.g. in select operations) can be identified by symbol (e.g. :city) as well as integer index.A Columns object itself behaves like a vector, and so can be used to represent the data part of a DTable. This provides one possible way to store multiple columns of data:t = IndexedTable(Columns(x = rand(4), y = rand(4)),\n                 Columns(observation = rand(1:2,4), confidence = rand(4)))\ndt = distribute(t, 2)In this case the data elements are structs with fields observation and confidence, and can be used as follows:filter(d->d.confidence > 0.5, dt)"
},

{
    "location": "apireference.html#",
    "page": "API Reference",
    "title": "API Reference",
    "category": "page",
    "text": "CurrentModule = JuliaDB"
},

{
    "location": "apireference.html#API-documentation-1",
    "page": "API Reference",
    "title": "API documentation",
    "category": "section",
    "text": ""
},

{
    "location": "apireference.html#Dagger.compute-Tuple{JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Dagger.compute",
    "category": "Method",
    "text": "compute(t::DTable, allowoverlap=true)\n\nComputes any delayed-evaluations in the DTable. The computed data is left on the worker processes. Subsequent operations on the results will reuse the chunks.\n\nIf allowoverlap is false then the computed data is resorted to have no chunks with overlapping index ranges if necessary.\n\nIf you expect the result of some operation to be used more than once, it's better to compute it once and then use it many times.\n\nSee also gather.\n\nwarning: Warning\ncompute(t) requires at least as much memory as the size of the result of the computing t. If the result is expected to be big, try compute(save(t, \"output_dir\")) instead. See save for more.\n\n\n\n"
},

{
    "location": "apireference.html#Dagger.gather-Tuple{JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Dagger.gather",
    "category": "Method",
    "text": "gather(t::DTable)\n\nGets distributed data in a DTable t and merges it into IndexedTable object\n\nwarning: Warning\ngather(t) requires at least as much memory as the size of the result of the computing t. If the result is expected to be big, try compute(save(t, \"output_dir\")) instead. See save for more. This data can be loaded later using load.\n\n\n\n"
},

{
    "location": "apireference.html#Compute-and-gather-1",
    "page": "API Reference",
    "title": "Compute and gather",
    "category": "section",
    "text": "Operations in JuliaDB are out-of-core in nature. They return DTable objects which can contain parts that are not yet evaluated. compute and gather are ways to force evaluation.compute(t::DTable)gather(t::DTable)"
},

{
    "location": "apireference.html#Base.getindex-Tuple{JuliaDB.DTable,Vararg{Any,N}}",
    "page": "API Reference",
    "title": "Base.getindex",
    "category": "Method",
    "text": "t[idx...]\n\nReturns a DTable containing only the elements of t where the given indices (idx) match. If idx has the same type as the index tuple of the t, then this is considered a scalar indexing (indexing of a single value). In this case the value itself is looked up and returned.\n\n\n\n"
},

{
    "location": "apireference.html#Indexing-1",
    "page": "API Reference",
    "title": "Indexing",
    "category": "section",
    "text": "getindex(t::DTable, idx...)"
},

{
    "location": "apireference.html#Base.Sort.select-Tuple{JuliaDB.DTable,Vararg{Pair,N}}",
    "page": "API Reference",
    "title": "Base.Sort.select",
    "category": "Method",
    "text": "select(t::DTable, conditions::Pair...)\n\nFilter based on index columns. Conditions are accepted as column-function pairs.\n\nExample: select(t, 1 => x->x>10, 3 => x->x!=10 ...)\n\n\n\n"
},

{
    "location": "apireference.html#Base.Sort.select-Tuple{JuliaDB.DTable,Vararg{Union{Int64,Symbol},N}}",
    "page": "API Reference",
    "title": "Base.Sort.select",
    "category": "Method",
    "text": "select(t::DTable, which...; agg)\n\nReturns a new DTable where only a subset of the index columns (specified by which) are kept.\n\nThe agg keyword argument is a function which specifies how entries with equal indices should be aggregated. If agg is unspecified, then the repeating indices are kept in the output, you can then aggregate using aggregate\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.aggregate-Tuple{Any,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.aggregate",
    "category": "Method",
    "text": "aggregate(f, t::DTable)\n\nCombines adjacent rows with equal indices using the given 2-argument reduction function f.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.aggregate_vec-Tuple{Any,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.aggregate_vec",
    "category": "Method",
    "text": "aggregate_vec(f::Function, x::DTable)\n\nCombine adjacent rows with equal indices using a function from vector to scalar, e.g. mean.\n\n\n\n"
},

{
    "location": "apireference.html#Base.filter-Tuple{Any,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Base.filter",
    "category": "Method",
    "text": "filter(f, t::DTable)\n\nFilters t removing rows for which f is false. f is passed only the data and not the index.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.convertdim-Tuple{JuliaDB.DTable,Union{Int64,Symbol},Any}",
    "page": "API Reference",
    "title": "IndexedTables.convertdim",
    "category": "Method",
    "text": "convertdim(x::DTable, d::DimName, xlate; agg::Function, name)\n\nApply function or dictionary xlate to each index in the specified dimension. If the mapping is many-to-one, agg is used to aggregate the results. name optionally specifies a name for the new dimension. xlate must be a monotonically increasing function.\n\nSee also reducedim and aggregate\n\n\n\n"
},

{
    "location": "apireference.html#Base.reducedim-Tuple{Any,JuliaDB.DTable,Any}",
    "page": "API Reference",
    "title": "Base.reducedim",
    "category": "Method",
    "text": "reducedim(f, t::DTable, dims)\n\nRemove dims dimensions from t, aggregate any rows with equal indices using 2-argument function f.\n\nSee also reducedim_vec, select and aggregate.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.reducedim_vec-Tuple{Any,JuliaDB.DTable,Any}",
    "page": "API Reference",
    "title": "IndexedTables.reducedim_vec",
    "category": "Method",
    "text": "reducedim_vec(f::Function, t::DTable, dims)\n\nLike reducedim, except uses a function mapping a vector of values to a scalar instead of a 2-argument scalar function.\n\nSee also reducedim and aggregate_vec.\n\n\n\n"
},

{
    "location": "apireference.html#Queries-1",
    "page": "API Reference",
    "title": "Queries",
    "category": "section",
    "text": "select(t::DTable, conditions::Pair...)select(t::DTable, which::JuliaDB.DimName...; agg)aggregate(f, t::DTable)aggregate_vec(f, t::DTable)filter(f, t::DTable)convertdim(t::DTable, d::DimName, xlate; agg::Function, name)reducedim(f, t::DTable, dims)reducedim_vec(f, t::DTable, dims)"
},

{
    "location": "apireference.html#IndexedTables.naturaljoin-Tuple{JuliaDB.DTable,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.naturaljoin",
    "category": "Method",
    "text": "naturaljoin(left::DTable, right::DTable, [op])\n\nReturns a new DTable containing only rows where the indices are present both in left AND right tables. The data columns are concatenated.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.leftjoin-Tuple{JuliaDB.DTable{K,V},JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.leftjoin",
    "category": "Method",
    "text": "leftjoin(left::DTable, right::DTable, [op::Function])\n\nKeeps only rows with indices in left. If rows of the same index are present in right, then they are combined using op. op by default picks the value from right.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.asofjoin-Tuple{JuliaDB.DTable,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.asofjoin",
    "category": "Method",
    "text": "asofjoin(left::DTable, right::DTable)\n\nKeeps the indices of left but uses the value from right corresponding to highest index less than or equal to that of left.\n\n\n\n"
},

{
    "location": "apireference.html#Base.merge-Tuple{JuliaDB.DTable,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Base.merge",
    "category": "Method",
    "text": "merge(left::DTable, right::DTable; agg)\n\nMerges left and right combining rows with matching indices using agg. By default agg picks the value from right.\n\n\n\n"
},

{
    "location": "apireference.html#Joins-1",
    "page": "API Reference",
    "title": "Joins",
    "category": "section",
    "text": "naturaljoin(left::DTable, right::DTable)leftjoin{K,V}(left::DTable{K,V}, right::DTable)asofjoin(left::DTable, right::DTable)merge(left::DTable, right::DTable; agg)"
},

]}
