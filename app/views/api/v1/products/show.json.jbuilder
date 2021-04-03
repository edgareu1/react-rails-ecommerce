json.extract! @product, :id, :name, :price, :average_rating, :image_url

json.reviews do
  json.array! @reviews do |review|
    json.merge! review
  end
end
