require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get twitter" do
    get users_twitter_url
    assert_response :success
  end

  test "should get register" do
    get users_register_url
    assert_response :success
  end

end
