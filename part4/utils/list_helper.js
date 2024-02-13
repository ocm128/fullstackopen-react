const dummy = () => {
  return 2
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (topLiked, blog) => {
    return (topLiked.likes > blog.likes) ? topLiked : blog
  }
  return blogs.reduce(reducer)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}