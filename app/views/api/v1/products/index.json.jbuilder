json.array! @products do |product|
  json.extract! product, :id, :name, :price, :average_rating, :image_url
end
