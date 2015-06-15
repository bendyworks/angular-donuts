class Donut < ActiveRecord::Base
  enum shape: %i{donut filled hole fritter}
end
