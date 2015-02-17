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
        {"source" => 0,"target" => 2,"value" => 100 * rand},
        {"source" => 2,"target" => 0,"value" => 100 * rand},
        {"source" => 0,"target" => 3,"value" => 100 * rand},
        {"source" => 1,"target" => 2,"value" => 100 * rand},
        {"source" => 1,"target" => 3,"value" => 100 * rand},
        {"source" => 0,"target" => 4,"value" => 100 * rand},
        {"source" => 4,"target" => 0,"value" => 100 * rand},
        {"source" => 2,"target" => 3,"value" => 100 * rand},
        {"source" => 2,"target" => 4,"value" => 100 * rand},
        {"source" => 3,"target" => 4,"value" => 100 * rand}
      ]
    }
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
