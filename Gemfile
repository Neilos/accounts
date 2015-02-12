source 'https://rubygems.org'

ruby '2.2.0'

gem 'rails', '4.1.9'

gem 'coffee-rails', '~> 4.0.0'
gem 'jbuilder', '~> 2.0'
gem 'jquery-rails'
gem 'pg'
gem 'sass-rails', '~> 4.0.3'
gem 'turbolinks'
gem 'uglifier', '>= 1.3.0'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :test do
  gem 'database_cleaner'
  gem 'launchy'
  gem 'poltergeist'
  gem 'shoulda-matchers'
end

group :development do
  gem 'better_errors'
  gem 'letter_opener'
  gem 'quiet_assets'
  gem 'spring' # Spring speeds up development by keeping your application running in the background.
end

group :development, :test do
  gem 'factory_girl_rails'
  gem 'pry'
  gem 'rspec-rails'
end

group :staging, :production do
  gem 'rails_12factor'
end

