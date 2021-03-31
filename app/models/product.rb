class Product < ApplicationRecord
  has_many :reviews

  def average_rating
    sum_ratings = reviews.reduce(0) { |sum, el| sum + el.score }
    result = (sum_ratings.to_f / reviews.length)

    return sprintf("%2.1f", result)
  end
end
