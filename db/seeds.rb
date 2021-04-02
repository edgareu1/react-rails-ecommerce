# This file should contain all the record creation needed to seed the database
# with its default values. The data can then be loaded with the
# bin/rails db:seed command (or created alongside the database with db:setup).

require 'faker'

num_products = 10
reviews_per_product = 5

num_products.times {
  new_product = Product.create(
    name: Faker::Game.title,
    image_url: "https://source.unsplash.com/random/500x500",
    price: rand(100) * 100
  )

  reviews_per_product.times {
    Review.create(
      author: Faker::Book.author,
      content: Faker::Restaurant.review,
      rating: rand(5) + 1,
      product: new_product
    )
  }
}
