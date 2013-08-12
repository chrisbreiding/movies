class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :chris, :sarah, :shortlist, :rt_id, :critics_score, :audience_score, :year, :runtime, :mpaa_rating, :poster_detailed, :poster_original, :poster_profile, :poster_thumbnail
  has_many :genres
  has_many :actors
  embed :ids, include: true
end
