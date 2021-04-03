class Api::V1::ProductsController < ApplicationController
  include ReviewsHelper

  def index
    @products = Product.all.sort
  end

  def show
    @product = Product.find(params[:id])
    @reviews = @product.reviews
      .max_by(5) { |review| review.created_at }
      .map { |review| format_review(review) }
  end
end
