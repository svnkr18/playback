import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utility/fetchFromAPI";
import { Videos, ChannelCard } from "./";

const ChannelDetail = () => {
  const [channelDetail, setchannelDetail] = useState(null);
  const [videos, setvideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setchannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setvideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(114,108,237,1) 0%, rgba(13,13,189,1) 53%, rgba(3,180,215,1) 100%)",

            height: "300px",

            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-123px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
