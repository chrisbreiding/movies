class GenreSerializer < ActiveModel::Serializer
  attributes :id, :name, :slug
  has_many :movies
  embed :ids, include: true
end
