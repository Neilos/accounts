source 'https://rubygems.org'

ruby '2.2.0'

gem 'rails', '4.1.9'
gem 'pg'
gem 'sass-rails', '~> 4.0.3'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0',          group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

group :test do
  gem 'shoulda-matchers'
  gem 'poltergeist'
  gem 'launchy'
  gem 'database_cleaner'
end

group :development do
  gem 'quiet_assets'
  gem 'better_errors'
  gem 'letter_opener'
end

group :development, :test do
  gem 'factory_girl_rails'
  gem 'rspec-rails'
  gem 'pry'
  gem 'dotenv-rails'
end

group :staging, :production do
  gem 'rails_12factor'
end

