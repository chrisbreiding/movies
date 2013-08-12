class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :chris, :sarah, :shortlist, :rt_id
  has_many :genres
  has_many :actors
  embed :ids, include: true
end
