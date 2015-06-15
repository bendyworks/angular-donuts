json.array!(@donuts) do |donut|
  json.extract! donut, :id, :flavor, :calories, :brand, :shape, :title, :country
  json.url donut_url(donut, format: :json)
end
