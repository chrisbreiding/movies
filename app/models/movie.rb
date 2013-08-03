class Movie < ActiveRecord::Base
  has_and_belongs_to_many :genres
  attr_accessible :title, :chris, :sarah, :shortlist, :rt_id
end
