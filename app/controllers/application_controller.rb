class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"node" => 0,"name" => "node0"},
        {"node" => 1,"name" => "node1"},
        {"node" => 2,"name" => "node2"},
        {"node" => 3,"name" => "node3"},
        {"node" => 4,"name" => "node4"}
      ],
      "links" => [
        {"source" => 0,"target" => 2,"value" => 5},
        {"source" => 2,"target" => 0,"value" => 1},
        {"source" => 0,"target" => 3,"value" => 3},
        {"source" => 1,"target" => 2,"value" => 2},
        {"source" => 1,"target" => 3,"value" => 2},
        {"source" => 0,"target" => 4,"value" => 2},
        {"source" => 4,"target" => 0,"value" => 1.5},
        {"source" => 2,"target" => 3,"value" => 2},
        {"source" => 2,"target" => 4,"value" => 2},
        {"source" => 3,"target" => 4,"value" => 4}
      ]
    }
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
