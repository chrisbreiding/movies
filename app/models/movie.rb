class Movie < ActiveRecord::Base
  has_and_belongs_to_many :genres
  has_and_belongs_to_many :actors
  attr_accessible :title, :chris, :sarah, :shortlist, :rt_id, :critics_score, :audience_score, :year, :runtime, :mpaa_rating, :poster_detailed, :poster_original, :poster_profile, :poster_thumbnail
end
