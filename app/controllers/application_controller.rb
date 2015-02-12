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
        {"source" => 0,"target" => 2,"value" => 5, "direction" => "cr->db"},
        {"source" => 1,"target" => 2,"value" => 2, "direction" => "cr->db"},
        {"source" => 1,"target" => 3,"value" => 2, "direction" => "cr->db"},
        {"source" => 0,"target" => 4,"value" => 2, "direction" => "cr->db"},
        {"source" => 2,"target" => 3,"value" => 2, "direction" => "cr->db"},
        {"source" => 2,"target" => 4,"value" => 2, "direction" => "cr->db"},
        {"source" => 3,"target" => 4,"value" => 4, "direction" => "cr->db"}
      ]
    }
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
