module ReviewsHelper
  include ActionView::Helpers::DateHelper

  def format_review(review)
    review.attributes
      .slice('id', 'author', 'content', 'rating')
      .merge!('created_time_ago' => time_ago_in_words(review.created_at))
  end
end
