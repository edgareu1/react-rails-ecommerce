class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
    @product = Product.find(params[:id])
    @reviews = @product.reviews
    @review = Review.new
  end
end
