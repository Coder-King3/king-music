import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { search } from '@/service/modules/other'
import { getSongDetail } from '@/service/modules/track'
import { mapTracksToIds } from '@/utils/common'

export const fetchTrackDataAction = createAsyncThunk(
  'fetchSearchData',
  ({ keywords, querys, fetchCycle }, { dispatch }) => {
    if (fetchCycle && fetchCycle?.cycleStart) fetchCycle?.cycleStart()

    const setTrackData = (value) => dispatch(changeTrackData(value))

    // 根据查询类型获取数据
    const requestAll = (requests) => {
      Promise.all(requests)
        .then((results) => {
          const resultsData = []
          results.forEach((result, index) => {
            if (result.result === undefined) return

            const searchType = result.type
            result = result.result
            switch (searchType) {
              case 'artists':
                resultsData.push({
                  key: 'artists',
                  value: result.artists ?? []
                })
                break
              case 'albums':
                resultsData.push({
                  key: 'albums',
                  value: result.albums ?? []
                })
                break
              case 'playlists':
                resultsData.push({
                  key: 'playlists',
                  value: result.playlists ?? []
                })
                break
              case 'songs':
                const tracksIds = mapTracksToIds(result.songs ?? [])
                if (tracksIds.length === 0) return
                getSongDetail(tracksIds.join(',')).then((result) => {
                  setTrackData([{ key: 'songs', value: result.songs ?? [] }])
                })
                break
              // case 'musicVideos':
              // state.musicVideos = result.mvs ?? []
              // break
              // case 'all':
              // state.result = result
              // break
            }
          })
          setTrackData(resultsData)
        })
        .finally(() => {
          if (fetchCycle && fetchCycle?.cycleEnd) fetchCycle?.cycleEnd()
        })
    }

    const requestArr = querys.map((qys) => {
      if (Array.isArray(qys)) {
        return qys.map(({ type, limit } = {}) => {
          return search(...[keywords, type, limit ?? undefined])
        })
      } else {
        throw new Error(
          `Multiple or one 'types array should be passed in the 'querys' array`
        )
      }
    })
    requestArr.forEach((requests) => {
      requestAll(requests)
    })
  }
)

const result = {
  artists: [
    {
      id: 6452,
      name: '周杰伦',
      picUrl:
        'https://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
      alias: ['Jay Chou', '周董'],
      albumSize: 39,
      picId: 109951169164936450,
      fansGroup: {
        id: '1567121373365878833',
        text: 'TA的乐迷团',
        targetUrl:
          'orpheus://rnpage?component=rn-fansgroup&isTheme=true&split=home&route=home&groupId=1567121373365878833&inviteCode=&scene=SEARCH',
        iconUrl:
          'https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/18471466967/2336/a754/1acf/2fded37a2611ee83f6810e9b91ed637a.png'
      },
      img1v1Url:
        'https://p1.music.126.net/_ECPuM0s0qtWhkpQOSTZUg==/109951169164936940.jpg',
      img1v1: 109951169164936940,
      mvSize: 8,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['Jay Chou', '周董'],
      trans: null
    },
    {
      id: 55039480,
      name: '每晚都听周杰伦',
      picUrl:
        'https://p1.music.126.net/5cgMbcss_THQrECMSntIpw==/109951168151853782.jpg',
      alias: [],
      albumSize: 1,
      picId: 109951168151853780,
      fansGroup: {
        id: '1698470246868566057',
        text: 'TA的乐迷团',
        targetUrl:
          'orpheus://rnpage?component=rn-fansgroup&isTheme=true&split=home&route=home&groupId=1698470246868566057&inviteCode=&scene=SEARCH',
        iconUrl:
          'https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/18471466967/2336/a754/1acf/2fded37a2611ee83f6810e9b91ed637a.png'
      },
      img1v1Url:
        'https://p1.music.126.net/ewqR2LnjygLU7y_5giJlQQ==/109951168784890696.jpg',
      accountId: 3412712612,
      img1v1: 109951168784890690,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 52198464,
      name: '周杰伦jay',
      picUrl:
        'https://p1.music.126.net/I4MM84YXhMRXiXfiDila5g==/109951167261193331.jpg',
      alias: [],
      albumSize: 2,
      picId: 109951167261193330,
      fansGroup: null,
      img1v1Url:
        'https://p1.music.126.net/SDBKzgexJFNm6ubmZ6S9VA==/109951168144071140.jpg',
      accountId: 1936009816,
      img1v1: 109951168144071140,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 58143942,
      name: '周杰伦呀',
      picUrl:
        'https://p2.music.126.net/96TWfe6tsnQgvFQh7xp9NQ==/109951169102168226.jpg',
      alias: ['杰伦呀'],
      albumSize: 4,
      picId: 109951169102168220,
      fansGroup: null,
      img1v1Url:
        'https://p1.music.126.net/f9Fzjj_j6GT4-_SPJsAlng==/109951169102161727.jpg',
      accountId: 8798406855,
      img1v1: 109951169102161730,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['杰伦呀'],
      trans: null
    },
    {
      id: 54707474,
      name: '周杰伦.',
      picUrl:
        'https://p2.music.126.net/9sX0I22TtVHRG4aW2ovcfw==/109951167568861282.jpg',
      alias: [],
      albumSize: 0,
      picId: 109951167568861280,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/rzpE5klaPcn4F7WLWP7R9g==/109951168118691296.jpg',
      accountId: 1606955737,
      img1v1: 109951168118691300,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 58612153,
      name: '奶茶店周杰伦',
      picUrl:
        'https://p2.music.126.net/NYz7wRDBmLX9T1G10s4M9g==/109951168961594204.jpg',
      alias: [],
      albumSize: 1,
      picId: 109951168961594200,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/7Blp-9ppPBc9PJdzB82XOw==/109951168961595227.jpg',
      accountId: 5211545738,
      img1v1: 109951168961595230,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 51972453,
      name: '湖北周杰伦',
      picUrl:
        'https://p2.music.126.net/7XkMGJMVoEcnFHDbD9ZM2Q==/109951167185997073.jpg',
      alias: [],
      albumSize: 1,
      picId: 109951167185997070,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/8aWfalj5O-xmSDSTnfqAEg==/109951168297160667.jpg',
      accountId: 1685738886,
      img1v1: 109951168297160670,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 52505521,
      name: '喝周杰伦的优乐美',
      picUrl:
        'https://p2.music.126.net/REmpkqRa7AAk5lc15RW1iQ==/109951167244399459.jpg',
      alias: [],
      albumSize: 1,
      picId: 109951167244399460,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/nXZqlCInodYIsQhR9hdIgw==/109951168881809742.jpg',
      accountId: 4942908125,
      img1v1: 109951168881809740,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 57140652,
      name: '周杰伦微博台',
      picUrl:
        'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      alias: [],
      albumSize: 0,
      picId: 5639395138885805,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      img1v1: -1,
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 51151846,
      name: 'Y',
      picUrl:
        'https://p2.music.126.net/83yiAuIIra5tuxOgKEN4Jw==/109951166991352498.jpg',
      alias: ['周杰伦'],
      albumSize: 1,
      picId: 109951166991352500,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/1EBMJliCQ_d0Yi3Ckq1LGw==/109951169167087286.jpg',
      accountId: 1905518444,
      img1v1: 109951169167087280,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['周杰伦'],
      trans: null
    },
    {
      id: 37339827,
      name: '听周杰伦',
      picUrl:
        'https://p2.music.126.net/zqtNZ9J-airTfBadtc7c-Q==/109951165438567849.jpg',
      alias: [],
      albumSize: 0,
      picId: 109951165438567860,
      fansGroup: {
        id: '1567121447613726815',
        text: 'TA的乐迷团',
        targetUrl:
          'orpheus://rnpage?component=rn-fansgroup&isTheme=true&split=home&route=home&groupId=1567121447613726815&inviteCode=&scene=SEARCH',
        iconUrl:
          'https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/18471466967/2336/a754/1acf/2fded37a2611ee83f6810e9b91ed637a.png'
      },
      img1v1Url:
        'https://p2.music.126.net/snIVA1ZdTB-Nb7GotRzqBg==/109951168974329344.jpg',
      accountId: 375219774,
      img1v1: 109951168974329340,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      trans: null
    },
    {
      id: 7219,
      name: '蔡依林',
      picUrl:
        'https://p2.music.126.net/gujwuHKRhTykPZS4GtJQ3g==/109951169061116331.jpg',
      alias: ['Jolin Tsai'],
      albumSize: 53,
      picId: 109951169061116340,
      fansGroup: {
        id: '1567123932146319415',
        text: 'TA的乐迷团',
        targetUrl:
          'orpheus://rnpage?component=rn-fansgroup&isTheme=true&split=home&route=home&groupId=1567123932146319415&inviteCode=&scene=SEARCH',
        iconUrl:
          'https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/18471466967/2336/a754/1acf/2fded37a2611ee83f6810e9b91ed637a.png'
      },
      img1v1Url:
        'https://p2.music.126.net/UJyEk9xa1T66zDnS0U8wGA==/109951169061111938.jpg',
      img1v1: 109951169061111940,
      mvSize: 182,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['Jolin Tsai'],
      trans: null
    },
    {
      id: 52047996,
      name: '彭鱼晏',
      picUrl:
        'https://p2.music.126.net/sY2mXRyZ1mlTvS1txK-6qQ==/109951166795458052.jpg',
      alias: ['杨国军.', '原来你不听周杰伦'],
      albumSize: 2,
      picId: 109951166795458050,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/JNWF6oQlKDsHIEv9NlVxBw==/109951169160358764.jpg',
      accountId: 1435194042,
      img1v1: 109951169160358770,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['杨国军.', '原来你不听周杰伦'],
      trans: null
    },
    {
      id: 52568671,
      name: '艾斯凯特 积冰',
      picUrl:
        'https://p2.music.126.net/t0GE4c58PGO_2rfRefKSDw==/109951167392211328.jpg',
      alias: ['山南周杰伦'],
      albumSize: 5,
      picId: 109951167392211330,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/Ex1ft7XLf1Q5ZL4r7WaXDg==/109951168765445552.jpg',
      accountId: 3229154232,
      img1v1: 109951168765445550,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['山南周杰伦'],
      trans: null
    },
    {
      id: 46819154,
      name: '正能量小王子',
      picUrl:
        'https://p2.music.126.net/Qz7olWlxCCIPe7z0RNCL1A==/109951165305177687.jpg',
      alias: ['濮阳周杰伦'],
      albumSize: 1,
      picId: 109951165305177680,
      fansGroup: null,
      img1v1Url:
        'https://p2.music.126.net/yovlJuhdh4MS9bnoaxExsw==/109951167914241737.jpg',
      accountId: 352132994,
      img1v1: 109951167914241740,
      identityIconUrl:
        'https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png',
      mvSize: 0,
      followed: false,
      alg: 'alg_search_precision_artist_tab_basic',
      alia: ['濮阳周杰伦'],
      trans: null
    }
  ],
  albums: [
    {
      name: '天台 电影原声带',
      id: 2489195,
      type: '专辑',
      size: 34,
      picId: 109951165806258000,
      blurPicUrl:
        'http://p2.music.126.net/EtNkS7FBXy8YKmychV7llw==/109951165806257997.jpg',
      companyId: 0,
      pic: 109951165806258000,
      picUrl:
        'http://p2.music.126.net/EtNkS7FBXy8YKmychV7llw==/109951165806257997.jpg',
      publishTime: 1373212800000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['THE ROOFTOP A Jay Chou Film OST'],
      status: 1,
      copyrightId: 5003,
      commentThreadId: 'R_AL_3_2489195',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951165806257997',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: 'Partners 拍档',
      id: 18909,
      type: '合集',
      size: 12,
      picId: 84662395339570,
      blurPicUrl:
        'http://p1.music.126.net/8jJexFFezjT6003BB2JAdQ==/84662395339570.jpg',
      companyId: 0,
      pic: 84662395339570,
      picUrl:
        'http://p1.music.126.net/8jJexFFezjT6003BB2JAdQ==/84662395339570.jpg',
      publishTime: 1017590400000,
      description: '',
      tags: '',
      company: '阿尔发音乐',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['周杰伦 方文山联手创作精选'],
      status: 1,
      copyrightId: 5003,
      commentThreadId: 'R_AL_3_18909',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        },
        {
          name: '方文山',
          id: 12203406,
          picId: 0,
          img1v1Id: 0,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0
        }
      ],
      paid: false,
      onSale: false,
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '11月的萧邦',
      id: 18896,
      type: '专辑',
      size: 12,
      picId: 109951167749320130,
      blurPicUrl:
        'http://p1.music.126.net/c6UWJU9iGaHGits7IqecRQ==/109951167749320136.jpg',
      companyId: 0,
      pic: 109951167749320130,
      picUrl:
        'http://p1.music.126.net/c6UWJU9iGaHGits7IqecRQ==/109951167749320136.jpg',
      publishTime: 1130774400000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ["November's Chopin"],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18896',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951167749320136',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '魔杰座',
      id: 18877,
      type: '专辑',
      size: 11,
      picId: 109951163200234830,
      blurPicUrl:
        'http://p2.music.126.net/HBanuZpt8SD2kf15AFa6Og==/109951163200234839.jpg',
      companyId: 0,
      pic: 109951163200234830,
      picUrl:
        'http://p2.music.126.net/HBanuZpt8SD2kf15AFa6Og==/109951163200234839.jpg',
      publishTime: 1224000000000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Capricorn'],
      status: 40,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18877',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951163200234839',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '我很忙',
      id: 18886,
      type: '专辑',
      size: 10,
      picId: 109951163533011730,
      blurPicUrl:
        'http://p2.music.126.net/STWQpRLgUBOcXQIDPoEL_A==/109951163533011733.jpg',
      companyId: 0,
      pic: 109951163533011730,
      picUrl:
        'http://p2.music.126.net/STWQpRLgUBOcXQIDPoEL_A==/109951163533011733.jpg',
      publishTime: 1193932800007,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['On The Run!'],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18886',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951163533011733',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '跨时代',
      id: 18875,
      type: '专辑',
      size: 11,
      picId: 19165587184063664,
      blurPicUrl:
        'http://p1.music.126.net/4E5b_0eDTiMCzYKiVSAerw==/19165587184063665.jpg',
      companyId: 0,
      pic: 19165587184063664,
      picUrl:
        'http://p1.music.126.net/4E5b_0eDTiMCzYKiVSAerw==/19165587184063665.jpg',
      publishTime: 1274112000000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['The Era'],
      status: -1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18875',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '19165587184063665',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '七里香',
      id: 18903,
      type: '专辑',
      size: 10,
      picId: 7746059418324672,
      blurPicUrl:
        'http://p1.music.126.net/P1goeQ7SoxEkFsb4ZDijMw==/7746059418324672.jpg',
      companyId: 0,
      pic: 7746059418324672,
      picUrl:
        'http://p1.music.126.net/P1goeQ7SoxEkFsb4ZDijMw==/7746059418324672.jpg',
      publishTime: 1091462400000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Common Jasmine Orange'],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18903',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '八度空间',
      id: 18907,
      type: '专辑',
      size: 10,
      picId: 109951166698447900,
      blurPicUrl:
        'http://p2.music.126.net/eDfuSni9ZWToHdqilVRI_w==/109951166698447900.jpg',
      companyId: 0,
      pic: 109951166698447900,
      picUrl:
        'http://p2.music.126.net/eDfuSni9ZWToHdqilVRI_w==/109951166698447900.jpg',
      publishTime: 1026921600000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['The Eight Dimensions'],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18907',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951166698447900',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '叶惠美',
      id: 18905,
      type: '专辑',
      size: 11,
      picId: 109951165566379710,
      blurPicUrl:
        'http://p2.music.126.net/ZGffiDQZrGj5s_hnR1CNbg==/109951165566379710.jpg',
      companyId: 0,
      pic: 109951165566379710,
      picUrl:
        'http://p2.music.126.net/ZGffiDQZrGj5s_hnR1CNbg==/109951165566379710.jpg',
      publishTime: 1059580800000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Yeh Hui–mei'],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18905',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951165566379710',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '十二新作',
      id: 2263029,
      type: '专辑',
      size: 12,
      picId: 109951163533013580,
      blurPicUrl:
        'http://p1.music.126.net/oL_TYdmT9mm_erNZb187_g==/109951163533013578.jpg',
      companyId: 0,
      pic: 109951163533013580,
      picUrl:
        'http://p1.music.126.net/oL_TYdmT9mm_erNZb187_g==/109951163533013578.jpg',
      publishTime: 1356624000007,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Opus 12'],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_2263029',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951163533013578',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '依然范特西',
      id: 18893,
      type: '专辑',
      size: 10,
      picId: 7980255395852522,
      blurPicUrl:
        'http://p2.music.126.net/06Yhj36Qu3ZCQJklc9MNKg==/7980255395852522.jpg',
      companyId: 0,
      pic: 7980255395852522,
      picUrl:
        'http://p2.music.126.net/06Yhj36Qu3ZCQJklc9MNKg==/7980255395852522.jpg',
      publishTime: 1157385600007,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Still Fantasy'],
      status: -1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18893',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '范特西',
      id: 18915,
      type: '专辑',
      size: 10,
      picId: 109951165606034160,
      blurPicUrl:
        'http://p2.music.126.net/7R4UhE4MBErGHvI-dB3Rzg==/109951165606034156.jpg',
      companyId: 0,
      pic: 109951165606034160,
      picUrl:
        'http://p2.music.126.net/7R4UhE4MBErGHvI-dB3Rzg==/109951165606034156.jpg',
      publishTime: 1000396800000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Fantasy'],
      status: 1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18915',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951165606034156',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: 'Jay',
      id: 18918,
      type: '专辑',
      size: 10,
      picId: 7946170535396804,
      blurPicUrl:
        'http://p1.music.126.net/Gd-HAk9hKC85L0wNtfRs1g==/7946170535396804.jpg',
      companyId: 0,
      pic: 7946170535396804,
      picUrl:
        'http://p1.music.126.net/Gd-HAk9hKC85L0wNtfRs1g==/7946170535396804.jpg',
      publishTime: 973526400000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['杰伦'],
      status: -1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_18918',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '周杰伦的床边故事',
      id: 34720827,
      type: '专辑',
      size: 10,
      picId: 3265549553028224,
      blurPicUrl:
        'http://p1.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg',
      companyId: 0,
      pic: 3265549553028224,
      picUrl:
        'http://p1.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg',
      publishTime: 1466697600007,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p1.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ["Jay Chou's Bedtime Stories"],
      status: 3,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_34720827',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '最伟大的作品',
      id: 147779282,
      type: '专辑',
      size: 12,
      picId: 109951169200514750,
      blurPicUrl:
        'http://p2.music.126.net/HGR4JbdzTJRBW2Ka3LRl6w==/109951169200514755.jpg',
      companyId: 0,
      pic: 109951169200514750,
      picUrl:
        'http://p2.music.126.net/HGR4JbdzTJRBW2Ka3LRl6w==/109951169200514755.jpg',
      publishTime: 1657814400000,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: [],
      status: -1,
      copyrightId: -1,
      commentThreadId: 'R_AL_3_147779282',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '109951169200514755',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    },
    {
      name: '哎呦，不错哦',
      id: 3084335,
      type: '专辑',
      size: 12,
      picId: 18874216602702136,
      blurPicUrl:
        'http://p2.music.126.net/unW9CQcqjzh8BYjsVqosWw==/18874216602702134.jpg',
      companyId: 0,
      pic: 18874216602702136,
      picUrl:
        'http://p2.music.126.net/unW9CQcqjzh8BYjsVqosWw==/18874216602702134.jpg',
      publishTime: 1419523200007,
      description: '',
      tags: '',
      company: '杰威尔',
      briefDesc: '',
      artist: {
        name: '周杰伦',
        id: 6452,
        picId: 109951169164936450,
        img1v1Id: 109951169164936940,
        briefDesc: '',
        picUrl:
          'http://p2.music.126.net/NWv6PtSBkyWZzqbJVzBr7g==/109951169164936450.jpg',
        img1v1Url:
          'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        albumSize: 39,
        alias: ['Jay Chou', '周董'],
        trans: '',
        musicSize: 532,
        topicPerson: 0,
        picId_str: '109951169164936450',
        img1v1Id_str: '109951169164936940',
        alia: ['Jay Chou', '周董']
      },
      songs: null,
      alias: ['Aiyo, Not Bad'],
      status: -1,
      copyrightId: 1007,
      commentThreadId: 'R_AL_3_3084335',
      artists: [
        {
          name: '周杰伦',
          id: 6452,
          picId: 0,
          img1v1Id: 109951169164936940,
          briefDesc: '',
          picUrl: '',
          img1v1Url:
            'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          albumSize: 0,
          alias: [],
          trans: '',
          musicSize: 0,
          topicPerson: 0,
          img1v1Id_str: '109951169164936940'
        }
      ],
      paid: false,
      onSale: false,
      picId_str: '18874216602702134',
      alg: 'alg_album_hotartist',
      mark: 0,
      containedSong: ''
    }
  ],
  songs: [
    {
      name: '布拉格广场',
      id: 210049,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 7219,
          name: '蔡依林',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000000210868',
      fee: 1,
      v: 57,
      crbt: null,
      cf: '',
      al: {
        id: 21349,
        name: '看我72变',
        picUrl:
          'https://p1.music.126.net/hQINyGWKnpuCqFUk55jXAQ==/109951167649668323.jpg',
        tns: [],
        pic_str: '109951167649668323',
        pic: 109951167649668320
      },
      dt: 294600,
      h: {
        br: 320000,
        fid: 0,
        size: 11786493,
        vd: -56486,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7071913,
        vd: -53918,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4714623,
        vd: -52333,
        sr: 44100
      },
      sq: {
        br: 948239,
        fid: 0,
        size: 34918981,
        vd: -56815,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 5,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 57,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 186025,
      publishTime: 1046880000000
    },
    {
      name: '屋顶',
      id: 5257138,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 9612,
          name: '温岚',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000009484210',
      fee: 8,
      v: 685,
      crbt: null,
      cf: '',
      al: {
        id: 512175,
        name: '男女情歌对唱冠军全记录',
        picUrl:
          'https://p1.music.126.net/81BsxxhomJ4aJZYvEbyPkw==/109951165671182684.jpg',
        tns: [],
        pic_str: '109951165671182684',
        pic: 109951165671182690
      },
      dt: 319039,
      h: {
        br: 320001,
        fid: 0,
        size: 12764517,
        vd: -37140,
        sr: 44100
      },
      m: {
        br: 192001,
        fid: 0,
        size: 7658728,
        vd: -34534,
        sr: 44100
      },
      l: {
        br: 128001,
        fid: 0,
        size: 5105833,
        vd: -32841,
        sr: 44100
      },
      sq: {
        br: 1619359,
        fid: 0,
        size: 64579972,
        vd: -37132,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 685,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 0,
      publishTime: 1170604800000
    },
    {
      name: '默 (Live)',
      id: 1888354230,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 4292,
          name: '李荣浩',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 1,
      v: 7,
      crbt: null,
      cf: '',
      al: {
        id: 135010288,
        name: '2021中国好声音 第1期',
        picUrl:
          'https://p1.music.126.net/pleQjKOI26fSenkUGipDLw==/109951166537300832.jpg',
        tns: [],
        pic_str: '109951166537300832',
        pic: 109951166537300830
      },
      dt: 133290,
      h: {
        br: 320000,
        fid: 0,
        size: 5334248,
        vd: -35927,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 3200566,
        vd: -33321,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 2133725,
        vd: -31685,
        sr: 44100
      },
      sq: {
        br: 833399,
        fid: 0,
        size: 13885571,
        vd: -35921,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '01',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 2,
      originSongSimpleData: {
        songId: 31473269,
        name: '默',
        artists: [
          {
            id: 9061,
            name: '那英'
          }
        ],
        albumMeta: {
          id: 3122021,
          name: '默'
        }
      },
      tagPicList: null,
      resourceState: true,
      version: 7,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1627574400000
    },
    {
      name: '魔术与歌曲：告白气球',
      id: 536570450,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 13228454,
          name: '蔡威泽',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 138,
      crbt: null,
      cf: '',
      al: {
        id: 37579061,
        name: '2018年中央电视台春节联欢晚会',
        picUrl:
          'https://p1.music.126.net/uIFI3Zx-3aiMNsFlAMBxBQ==/109951163142162226.jpg',
        tns: [],
        pic_str: '109951163142162226',
        pic: 109951163142162220
      },
      dt: 214203,
      h: {
        br: 320000,
        fid: 0,
        size: 8570297,
        vd: -25765,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5142195,
        vd: -23150,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3428145,
        vd: -21508,
        sr: 44100
      },
      sq: null,
      hr: null,
      a: null,
      cd: '1',
      no: 9,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 17179877384,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 138,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 677016,
      mv: 0,
      publishTime: 1518624000000
    },
    {
      name: '因为爱情 (Live)',
      id: 490595315,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 9061,
          name: '那英',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 1,
      v: 41,
      crbt: null,
      cf: '',
      al: {
        id: 35757091,
        name: '中国新歌声第二季 第1期',
        picUrl:
          'https://p1.music.126.net/7ohi163WcAw-njQIJ7PlPQ==/18892908300315027.jpg',
        tns: [],
        pic_str: '18892908300315027',
        pic: 18892908300315028
      },
      dt: 202051,
      h: {
        br: 320002,
        fid: 0,
        size: 8084205,
        vd: 7143,
        sr: 48000
      },
      m: {
        br: 192002,
        fid: 0,
        size: 4850541,
        vd: 9726,
        sr: 48000
      },
      l: {
        br: 128002,
        fid: 0,
        size: 3233709,
        vd: 11390,
        sr: 48000
      },
      sq: {
        br: 877518,
        fid: 0,
        size: 22162991,
        vd: 7152,
        sr: 48000
      },
      hr: null,
      a: null,
      cd: '1',
      no: 4,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 17179942912,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 41,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1499961600007
    },
    {
      name: '刀马旦',
      id: 255020,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 8331,
          name: '李玟',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000005319691',
      fee: 1,
      v: 34,
      crbt: null,
      cf: '',
      al: {
        id: 25475,
        name: 'Promise',
        picUrl:
          'https://p1.music.126.net/dDgHDWlJAFwkMNrjbQExIA==/109951165959446596.jpg',
        tns: [],
        pic_str: '109951165959446596',
        pic: 109951165959446600
      },
      dt: 192075,
      h: {
        br: 320002,
        fid: 0,
        size: 7685268,
        vd: -52964,
        sr: 44100
      },
      m: {
        br: 192002,
        fid: 0,
        size: 4611178,
        vd: -50367,
        sr: 44100
      },
      l: {
        br: 128002,
        fid: 0,
        size: 3074133,
        vd: -48717,
        sr: 44100
      },
      sq: {
        br: 993056,
        fid: 0,
        size: 23842778,
        vd: -52997,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 34,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 5287134,
      publishTime: 1002902400000
    },
    {
      name: '骑士精神',
      id: 210062,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 7219,
          name: '蔡依林',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000005317941',
      fee: 1,
      v: 47,
      crbt: null,
      cf: '',
      al: {
        id: 21349,
        name: '看我72变',
        picUrl:
          'https://p1.music.126.net/hQINyGWKnpuCqFUk55jXAQ==/109951167649668323.jpg',
        tns: [],
        pic_str: '109951167649668323',
        pic: 109951167649668320
      },
      dt: 257572,
      h: {
        br: 320000,
        fid: 0,
        size: 10305872,
        vd: -55614,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6183541,
        vd: -53044,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4122375,
        vd: -51446,
        sr: 44100
      },
      sq: {
        br: 990015,
        fid: 0,
        size: 31875167,
        vd: -55665,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 11,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 47,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 186031,
      publishTime: 1046880000000
    },
    {
      name: '布拉格广场',
      id: 5234479,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 7219,
          name: '蔡依林',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000000210868',
      fee: 8,
      v: 685,
      crbt: null,
      cf: '',
      al: {
        id: 510845,
        name: '跨世纪金曲精选',
        picUrl:
          'https://p1.music.126.net/rcGG58RFPous1aKTeu5BgQ==/605830906916387.jpg',
        tns: [],
        pic: 605830906916387
      },
      dt: 293851,
      h: {
        br: 320000,
        fid: 0,
        size: 11757236,
        vd: -50103,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7054359,
        vd: -47519,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4702920,
        vd: -45884,
        sr: 44100
      },
      sq: {
        br: 1648988,
        fid: 0,
        size: 60569832,
        vd: -50100,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 8,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 685,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 186025,
      publishTime: 1307980800000
    },
    {
      name: '想你就写信 (Live)',
      id: 509781655,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 12010120,
          name: '李硕',
          tns: [],
          alias: []
        },
        {
          id: 12319226,
          name: '张鑫',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 1,
      v: 23,
      crbt: null,
      cf: '',
      al: {
        id: 36412633,
        name: '中国新歌声第二季 第13期',
        picUrl:
          'https://p1.music.126.net/yD9vbpuILH-tqNRIaP640g==/109951163038292176.jpg',
        tns: [],
        pic_str: '109951163038292176',
        pic: 109951163038292180
      },
      dt: 238698,
      h: {
        br: 320000,
        fid: 0,
        size: 9550125,
        vd: -26954,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5730093,
        vd: -24349,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3820077,
        vd: -22587,
        sr: 48000
      },
      sq: {
        br: 918368,
        fid: 0,
        size: 27401646,
        vd: -26951,
        sr: 48000
      },
      hr: null,
      a: null,
      cd: '1',
      no: 5,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179942912,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 23,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1507046400000
    },
    {
      name: '沧海一声笑 (Live)',
      id: 490602328,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 9061,
          name: '那英',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 3688,
          name: '刘欢',
          tns: [],
          alias: []
        },
        {
          id: 2116,
          name: '陈奕迅',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 1,
      v: 23,
      crbt: null,
      cf: '',
      al: {
        id: 35757091,
        name: '中国新歌声第二季 第1期',
        picUrl:
          'https://p1.music.126.net/7ohi163WcAw-njQIJ7PlPQ==/18892908300315027.jpg',
        tns: [],
        pic_str: '18892908300315027',
        pic: 18892908300315028
      },
      dt: 177783,
      h: {
        br: 320000,
        fid: 0,
        size: 7113645,
        vd: -40101,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 4268205,
        vd: -37509,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 2845485,
        vd: -35952,
        sr: 48000
      },
      sq: {
        br: 1013737,
        fid: 0,
        size: 22528184,
        vd: -40089,
        sr: 48000
      },
      hr: null,
      a: null,
      cd: '1',
      no: 7,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179942912,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 23,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1499961600007
    },
    {
      name: '刀马旦',
      id: 5257160,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 8331,
          name: '李玟',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 95,
      st: 0,
      rt: '600902000005319691',
      fee: 8,
      v: 685,
      crbt: null,
      cf: '',
      al: {
        id: 512175,
        name: '男女情歌对唱冠军全记录',
        picUrl:
          'https://p1.music.126.net/81BsxxhomJ4aJZYvEbyPkw==/109951165671182684.jpg',
        tns: [],
        pic_str: '109951165671182684',
        pic: 109951165671182690
      },
      dt: 192075,
      h: {
        br: 320002,
        fid: 0,
        size: 7685268,
        vd: -52964,
        sr: 44100
      },
      m: {
        br: 192002,
        fid: 0,
        size: 4611178,
        vd: -50367,
        sr: 44100
      },
      l: {
        br: 128002,
        fid: 0,
        size: 3074133,
        vd: -48717,
        sr: 44100
      },
      sq: {
        br: 993056,
        fid: 0,
        size: 23842778,
        vd: -53408,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 23,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 685,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 0,
      publishTime: 1170604800000
    },
    {
      name: '骑士精神',
      id: 185776,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 7219,
          name: '蔡依林',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000005317941',
      fee: 8,
      v: 677,
      crbt: null,
      cf: '',
      al: {
        id: 18884,
        name: '我们都爱这个伦！',
        picUrl:
          'https://p1.music.126.net/EtAmx3bTlK5j9urcVx8PGA==/97856534884248.jpg',
        tns: [],
        pic: 97856534884248
      },
      dt: 257572,
      h: {
        br: 320000,
        fid: 0,
        size: 10305872,
        vd: -55614,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6183541,
        vd: -53044,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4122375,
        vd: -51446,
        sr: 44100
      },
      sq: {
        br: 990015,
        fid: 0,
        size: 31875167,
        vd: -55999,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 14,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 677,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 186031,
      publishTime: 1195142400000
    },
    {
      name: '布拉格广场',
      id: 185790,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 7219,
          name: '蔡依林',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000000210868',
      fee: 8,
      v: 683,
      crbt: null,
      cf: '',
      al: {
        id: 18884,
        name: '我们都爱这个伦！',
        picUrl:
          'https://p1.music.126.net/EtAmx3bTlK5j9urcVx8PGA==/97856534884248.jpg',
        tns: [],
        pic: 97856534884248
      },
      dt: 293851,
      h: {
        br: 320000,
        fid: 0,
        size: 11757236,
        vd: -50103,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7054359,
        vd: -47519,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4702920,
        vd: -45884,
        sr: 44100
      },
      sq: {
        br: 1648988,
        fid: 0,
        size: 60569832,
        vd: -50100,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 22,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 683,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 186025,
      publishTime: 1195142400000
    },
    {
      name: '乌克丽丽 (Live)',
      id: 509781651,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        },
        {
          id: 27819671,
          name: '陈颖恩',
          tns: [],
          alias: []
        },
        {
          id: 29780520,
          name: '肖邦妮',
          tns: [],
          alias: []
        },
        {
          id: 12788261,
          name: '朱文婷',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 1,
      v: 22,
      crbt: null,
      cf: '',
      al: {
        id: 36412633,
        name: '中国新歌声第二季 第13期',
        picUrl:
          'https://p1.music.126.net/yD9vbpuILH-tqNRIaP640g==/109951163038292176.jpg',
        tns: [],
        pic_str: '109951163038292176',
        pic: 109951163038292180
      },
      dt: 193290,
      h: {
        br: 320000,
        fid: 0,
        size: 7733805,
        vd: -49127,
        sr: 48000
      },
      m: {
        br: 192000,
        fid: 0,
        size: 4640301,
        vd: -46501,
        sr: 48000
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3093549,
        vd: -44708,
        sr: 48000
      },
      sq: {
        br: 1002652,
        fid: 0,
        size: 24225343,
        vd: -49123,
        sr: 48000
      },
      hr: null,
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17179942912,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 22,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 0,
      mv: 0,
      publishTime: 1507046400000
    },
    {
      name: '海盗',
      id: 209917,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 7219,
          name: '蔡依林',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000005317791',
      fee: 1,
      v: 45,
      crbt: null,
      cf: '',
      al: {
        id: 21343,
        name: '城堡',
        picUrl:
          'https://p1.music.126.net/BVT-OnAmS0UWNhKeq9oNSQ==/109951167146289431.jpg',
        tns: [],
        pic_str: '109951167146289431',
        pic: 109951167146289420
      },
      dt: 277347,
      h: {
        br: 320000,
        fid: 0,
        size: 11096860,
        vd: -50126,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6658133,
        vd: -47535,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4438770,
        vd: -45925,
        sr: 44100
      },
      sq: {
        br: 936350,
        fid: 0,
        size: 32461751,
        vd: -50110,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 4,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 45,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 185048,
      publishTime: 1433260800000
    },
    {
      name: '刀马旦',
      id: 1372847156,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 8331,
          name: '李玟',
          tns: [],
          alias: []
        },
        {
          id: 6452,
          name: '周杰伦',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 95,
      st: 0,
      rt: '',
      fee: 8,
      v: 12,
      crbt: null,
      cf: '',
      al: {
        id: 79885567,
        name: 'You & I 经典全纪录 Part II',
        picUrl:
          'https://p1.music.126.net/Qyb1OBlr5cwG1Th6ZhwVZw==/109951165986697918.jpg',
        tns: [],
        pic_str: '109951165986697918',
        pic: 109951165986697920
      },
      dt: 192075,
      h: {
        br: 320002,
        fid: 0,
        size: 7685268,
        vd: -52964,
        sr: 44100
      },
      m: {
        br: 192002,
        fid: 0,
        size: 4611178,
        vd: -50367,
        sr: 44100
      },
      l: {
        br: 128002,
        fid: 0,
        size: 3074133,
        vd: -48717,
        sr: 44100
      },
      sq: {
        br: 993056,
        fid: 0,
        size: 23842778,
        vd: -53090,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '01',
      no: 4,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 12,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7001,
      mv: 0,
      publishTime: 1562860800000
    }
  ],
  playlists: [
    {
      id: 11860849,
      name: '周杰伦最全歌曲集',
      coverImgUrl:
        'http://p1.music.126.net/idiGYmFD8okqCOols2yzpA==/1378787593550038.jpg',
      creator: {
        nickname: 'Zacharyeah',
        userId: 3647122,
        userType: 207,
        avatarUrl:
          'http://p1.music.126.net/QsHtyGBrNDy_QoDLrgS8yQ==/109951166630032200.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 375,
      userId: 3647122,
      playCount: 21073036,
      bookCount: 234893,
      specialType: 0,
      officialTags: ['最多人点', '本周热门收听'],
      action:
        'orpheus://nm/playlist/detail?id=11860849&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '9.3',
      description:
        '无与伦比，为杰沉伦\n\n目前收录了网易上能找到的最全的周杰伦演唱歌曲集，没有之一',
      highQuality: false,
      track: {
        name: '布拉格广场',
        id: 210049,
        position: 5,
        alias: [],
        status: 0,
        fee: 1,
        copyrightId: 7001,
        disc: '1',
        no: 5,
        artists: [
          {
            name: '蔡依林',
            id: 7219,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          {
            name: '周杰伦',
            id: 6452,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '看我72变',
          id: 21349,
          idStr: null,
          type: '专辑',
          size: 11,
          picId: 109951167649668320,
          blurPicUrl:
            'http://p2.music.126.net/hQINyGWKnpuCqFUk55jXAQ==/109951167649668323.jpg',
          companyId: 0,
          pic: 109951167649668320,
          picUrl:
            'http://p2.music.126.net/hQINyGWKnpuCqFUk55jXAQ==/109951167649668323.jpg',
          publishTime: 1046966400000,
          description: '',
          tags: '',
          company: '索尼音乐',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 7001,
          commentThreadId: 'R_AL_3_21349',
          artists: [
            {
              name: '蔡依林',
              id: 7219,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951167649668323'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 294600,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '600902000000210868',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_210049',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 186025,
        bMusic: {
          name: null,
          id: 8169471599,
          size: 4714623,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 294600,
          volumeDelta: -52333
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8169471597,
          size: 11786493,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 294600,
          volumeDelta: -56486
        },
        mMusic: {
          name: null,
          id: 8169471601,
          size: 7071913,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 294600,
          volumeDelta: -53918
        },
        lMusic: {
          name: null,
          id: 8169471599,
          size: 4714623,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 294600,
          volumeDelta: -52333
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 8739610036,
      name: '周杰伦歌曲免费听 | 每首都是青春的回忆',
      coverImgUrl:
        'http://p1.music.126.net/B2-VgHfOz0pgyATznAV_IA==/109951168980584595.jpg',
      creator: {
        nickname: '白鱼暮归',
        userId: 380154710,
        userType: 200,
        avatarUrl:
          'http://p1.music.126.net/-AePmCV8NfpUxRe7V4tAgw==/109951169029121449.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 75,
      userId: 380154710,
      playCount: 1720479,
      bookCount: 8401,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=8739610036&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '8.6',
      description:
        '拯救地球好累，虽然有些疲惫但我还是会，不要问我哭过了没，因为超人不能流眼泪\n\n不如就承认一下，我没有想象的那么坚强，也没有那样刀枪不入，我明明就只是想被温柔的抱一下。',
      highQuality: false,
      track: {
        name: '圣地的火车',
        id: 2058465281,
        position: 0,
        alias: [],
        status: 0,
        fee: 8,
        copyrightId: 0,
        disc: '01',
        no: 3,
        artists: [
          {
            name: '环跳 Ring Jump',
            id: 57313305,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '路口的火车',
          id: 168240063,
          idStr: null,
          type: 'EP',
          size: 8,
          picId: 109951168696682300,
          blurPicUrl:
            'http://p2.music.126.net/E45EsPMwQ3puGpAU0cSwiQ==/109951168696682311.jpg',
          companyId: 0,
          pic: 109951168696682300,
          picUrl:
            'http://p2.music.126.net/E45EsPMwQ3puGpAU0cSwiQ==/109951168696682311.jpg',
          publishTime: 1687881600000,
          description: '',
          tags: '',
          company: null,
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 0,
          commentThreadId: 'R_AL_3_168240063',
          artists: [
            {
              name: '环跳 Ring Jump',
              id: 57313305,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951168696682311'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 273866,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2058465281',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 14676505,
        bMusic: {
          name: null,
          id: 8217121454,
          size: 4383021,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 128000,
          playTime: 273866,
          volumeDelta: -68090
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8217121458,
          size: 10957485,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 320000,
          playTime: 273866,
          volumeDelta: -71966
        },
        mMusic: {
          name: null,
          id: 8217121453,
          size: 6574509,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 192000,
          playTime: 273866,
          volumeDelta: -69480
        },
        lMusic: {
          name: null,
          id: 8217121454,
          size: 4383021,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 128000,
          playTime: 273866,
          volumeDelta: -68090
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 8788103384,
      name: '周杰伦歌曲｜Jay经典 青春回忆旋律曲',
      coverImgUrl:
        'http://p1.music.126.net/XrCfa651cg0w0FjTVGKujw==/109951169228063456.jpg',
      creator: {
        nickname: '凌晨一点的莱茵猫',
        userId: 342371680,
        userType: 4,
        avatarUrl:
          'http://p1.music.126.net/1f6ODBE8j_QnFCa7uD7eAA==/109951169221710869.jpg',
        authStatus: 1,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 115,
      userId: 342371680,
      playCount: 87047,
      bookCount: 541,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=8788103384&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '8.6',
      description:
        '人与人之间的滤镜 不过是一双偏爱的眼睛\n\n爱是枫 是花海 是珊瑚海 是蒲公英的约定 我是如此相信 爱也是七里香 是晴天 是大笨钟 是园游会里的 彩虹 是说好的幸福 是黑色幽默里的暗号 是爱在西元前 你听得到 但我还是想说的是枫的最后一句.',
      highQuality: false,
      track: {
        name: '爱一点',
        id: 2118409169,
        position: 0,
        alias: ['抖音热播'],
        status: 0,
        fee: 8,
        copyrightId: 2717404,
        disc: '01',
        no: 1,
        artists: [
          {
            name: '呆西',
            id: 59822722,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '爱一点',
          id: 183482419,
          idStr: null,
          type: 'Single',
          size: 1,
          picId: 109951169267876320,
          blurPicUrl:
            'http://p2.music.126.net/1iUpChKX0tjLZcJDaSpBhA==/109951169267876322.jpg',
          companyId: 0,
          pic: 109951169267876320,
          picUrl:
            'http://p2.music.126.net/1iUpChKX0tjLZcJDaSpBhA==/109951169267876322.jpg',
          publishTime: 1705507200000,
          description: '',
          tags: '',
          company: '',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: -1,
          commentThreadId: 'R_AL_3_183482419',
          artists: [
            {
              name: '呆西',
              id: 59822722,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951169267876322'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 120058,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2118409169',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 8768195508,
          size: 1921820,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128003,
          playTime: 120058,
          volumeDelta: -6488
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8768195504,
          size: 4804485,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320003,
          playTime: 120058,
          volumeDelta: -10918
        },
        mMusic: {
          name: null,
          id: 8768195506,
          size: 2882708,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192003,
          playTime: 120058,
          volumeDelta: -8291
        },
        lMusic: {
          name: null,
          id: 8768195508,
          size: 1921820,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128003,
          playTime: 120058,
          volumeDelta: -6488
        },
        transNames: ['夜闭上双眼不说话']
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 6792103822,
      name: '周杰伦-Jay『网易云精选』',
      coverImgUrl:
        'http://p1.music.126.net/hLwfC87t4OoD07kyA38drg==/109951168649400907.jpg',
      creator: {
        nickname: '奇龙耶夫',
        userId: 361038766,
        userType: 200,
        avatarUrl:
          'http://p1.music.126.net/csPtBON42bw9GnUxV46nwA==/109951168570139117.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 141,
      userId: 361038766,
      playCount: 14364067,
      bookCount: 79198,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=6792103822&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '7.5',
      description: '欢 迎 投 稿， 持 续 更 新 ！',
      highQuality: false,
      track: {
        name: '圣地的火车',
        id: 2058465281,
        position: 0,
        alias: [],
        status: 0,
        fee: 8,
        copyrightId: 0,
        disc: '01',
        no: 3,
        artists: [
          {
            name: '环跳 Ring Jump',
            id: 57313305,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '路口的火车',
          id: 168240063,
          idStr: null,
          type: 'EP',
          size: 8,
          picId: 109951168696682300,
          blurPicUrl:
            'http://p2.music.126.net/E45EsPMwQ3puGpAU0cSwiQ==/109951168696682311.jpg',
          companyId: 0,
          pic: 109951168696682300,
          picUrl:
            'http://p2.music.126.net/E45EsPMwQ3puGpAU0cSwiQ==/109951168696682311.jpg',
          publishTime: 1687881600000,
          description: '',
          tags: '',
          company: null,
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 0,
          commentThreadId: 'R_AL_3_168240063',
          artists: [
            {
              name: '环跳 Ring Jump',
              id: 57313305,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951168696682311'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 273866,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2058465281',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 14676505,
        bMusic: {
          name: null,
          id: 8217121454,
          size: 4383021,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 128000,
          playTime: 273866,
          volumeDelta: -68090
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8217121458,
          size: 10957485,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 320000,
          playTime: 273866,
          volumeDelta: -71966
        },
        mMusic: {
          name: null,
          id: 8217121453,
          size: 6574509,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 192000,
          playTime: 273866,
          volumeDelta: -69480
        },
        lMusic: {
          name: null,
          id: 8217121454,
          size: 4383021,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 128000,
          playTime: 273866,
          volumeDelta: -68090
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 8892148524,
      name: '周杰伦-合集/网易云精选',
      coverImgUrl:
        'http://p1.music.126.net/EoYdkfWz9TxjfOX9AJ0h2Q==/109951169149048021.jpg',
      creator: {
        nickname: '屋顶听着Jay的歌',
        userId: 1856984756,
        userType: 200,
        avatarUrl:
          'http://p1.music.126.net/1j5e_Y7HxV0nVKsQ_zvnkw==/109951168723852987.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 197,
      userId: 1856984756,
      playCount: 140770,
      bookCount: 1405,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=8892148524&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '7.5',
      description: '『 持 续 更 新 』 欢 迎 投 稿！',
      highQuality: false,
      track: {
        name: '晴天',
        id: 2076488356,
        position: 0,
        alias: [],
        status: 0,
        fee: 0,
        copyrightId: 0,
        disc: '01',
        no: 2,
        artists: [
          {
            name: '隐败',
            id: 57950146,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '杂集',
          id: 172920277,
          idStr: null,
          type: '专辑',
          size: 11,
          picId: 109951168855944750,
          blurPicUrl:
            'http://p1.music.126.net/vtM87Ayayng8NUrWM1Izbw==/109951168855944759.jpg',
          companyId: 0,
          pic: 109951168855944750,
          picUrl:
            'http://p1.music.126.net/vtM87Ayayng8NUrWM1Izbw==/109951168855944759.jpg',
          publishTime: 1692374400000,
          description: '',
          tags: '',
          company: null,
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 0,
          commentThreadId: 'R_AL_3_172920277',
          artists: [
            {
              name: '隐败',
              id: 57950146,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951168855944759'
        },
        starred: false,
        popularity: 90,
        score: 90,
        starredNum: 0,
        duration: 44341,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2076488356',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 8381702623,
          size: 710445,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 128000,
          playTime: 44341,
          volumeDelta: -45715
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8381702620,
          size: 1776045,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 320000,
          playTime: 44341,
          volumeDelta: -50171
        },
        mMusic: {
          name: null,
          id: 8381702622,
          size: 1065645,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 192000,
          playTime: 44341,
          volumeDelta: -47525
        },
        lMusic: {
          name: null,
          id: 8381702623,
          size: 710445,
          extension: 'mp3',
          sr: 48000,
          dfsId: 0,
          bitrate: 128000,
          playTime: 44341,
          volumeDelta: -45715
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 9112475980,
      name: '周杰伦歌曲| 90后青春 每首都是青春的回忆',
      coverImgUrl:
        'http://p1.music.126.net/rOFT2afIj7lSf9LsAAbvJQ==/109951169228183315.jpg',
      creator: {
        nickname: '凌晨一点的莱茵猫',
        userId: 342371680,
        userType: 4,
        avatarUrl:
          'http://p1.music.126.net/1f6ODBE8j_QnFCa7uD7eAA==/109951169221710869.jpg',
        authStatus: 1,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 60,
      userId: 342371680,
      playCount: 15857,
      bookCount: 96,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=9112475980&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '8.8',
      description:
        '人与人之间的滤镜 不过是一双偏爱的眼睛\n\n玫瑰在小王子离开的时候说：“我当然爱你，没有让你感觉到，是我的不对”。\n我真的不擅长表达，只会怯生生的喜欢你，或是任性的生闷气。\n很遗憾没能留住你，但说真的，那时我真的超喜欢你。',
      highQuality: false,
      track: {
        name: '最长的电影',
        id: 28427771,
        position: 0,
        alias: [],
        status: 0,
        fee: 1,
        copyrightId: 404023,
        disc: '1',
        no: 5,
        artists: [
          {
            name: '茜拉',
            id: 275494,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '我是歌手第二季 第8期',
          id: 2786867,
          idStr: null,
          type: '专辑',
          size: 7,
          picId: 5920870115754269,
          blurPicUrl:
            'http://p1.music.126.net/n9D1R_zL_XaKW9zfW8s2tA==/5920870115754269.jpg',
          companyId: 0,
          pic: 5920870115754269,
          picUrl:
            'http://p1.music.126.net/n9D1R_zL_XaKW9zfW8s2tA==/5920870115754269.jpg',
          publishTime: 1393516800000,
          description: '',
          tags: '',
          company: '快乐阳光',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 12009,
          commentThreadId: 'R_AL_3_2786867',
          artists: [
            {
              name: '我是歌手',
              id: 34306960,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 317592,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_28427771',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 8169471967,
          size: 5082427,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 317592,
          volumeDelta: -752
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8169471966,
          size: 12706003,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 317592,
          volumeDelta: -5119
        },
        mMusic: {
          name: null,
          id: 8169471960,
          size: 7623619,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 317592,
          volumeDelta: -2494
        },
        lMusic: {
          name: null,
          id: 8169471967,
          size: 5082427,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 317592,
          volumeDelta: -752
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 40264417,
      name: '周杰伦 热门50单曲',
      coverImgUrl:
        'http://p1.music.126.net/wP2sCeEONO0P-X3jbZhO2w==/7950568582187351.jpg',
      creator: {
        nickname: '上山抓土匪',
        userId: 489519,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/WCPr4l_k1z_vZsGty6KHJA==/109951162848589204.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 50,
      userId: 489519,
      playCount: 1126960,
      bookCount: 14267,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=40264417&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description:
        '就像爱情最终还是抵不过倾向利益的现实，总会有告别。\n现在歌单里的歌基本都下架了。做个纪念吧，可能未来会重新上架。',
      highQuality: false,
      track: {
        name: '彩虹',
        id: 185809,
        position: 2,
        alias: ['电影《命运呼叫转移》片尾曲'],
        status: 0,
        fee: 0,
        copyrightId: 1007,
        disc: '1',
        no: 2,
        artists: [
          {
            name: '周杰伦',
            id: 6452,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '我很忙',
          id: 18886,
          idStr: null,
          type: '专辑',
          size: 10,
          picId: 109951163533011730,
          blurPicUrl:
            'http://p1.music.126.net/STWQpRLgUBOcXQIDPoEL_A==/109951163533011733.jpg',
          companyId: 0,
          pic: 109951163533011730,
          picUrl:
            'http://p1.music.126.net/STWQpRLgUBOcXQIDPoEL_A==/109951163533011733.jpg',
          publishTime: 1193932800007,
          description: '',
          tags: '',
          company: '杰威尔',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: ['On The Run!'],
          status: 1,
          copyrightId: 1007,
          commentThreadId: 'R_AL_3_18886',
          artists: [
            {
              name: '周杰伦',
              id: 6452,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951163533011733'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 263784,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '600902000006889092',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_185809',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 5293415,
        bMusic: {
          name: null,
          id: 116698589,
          size: 4221430,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 263784,
          volumeDelta: -15392
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 116698587,
          size: 10553512,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 263784,
          volumeDelta: -19720
        },
        mMusic: {
          name: null,
          id: 116698588,
          size: 6332124,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 263784,
          volumeDelta: -17120
        },
        lMusic: {
          name: null,
          id: 116698589,
          size: 4221430,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 263784,
          volumeDelta: -15392
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 8811469204,
      name: '周杰伦最全歌曲合集',
      coverImgUrl:
        'http://p1.music.126.net/zhUn3T-VYT6Tjq5-KmY6bw==/109951168997587335.jpg',
      creator: {
        nickname: '乐爷r',
        userId: 537355012,
        userType: 4,
        avatarUrl:
          'http://p1.music.126.net/yjVnVyqNyH4zs-8Iph76lA==/109951168991727518.jpg',
        authStatus: 1,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 239,
      userId: 537355012,
      playCount: 173131,
      bookCount: 654,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=8811469204&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '8.0',
      description: '网易云最全的周杰伦歌曲合集\n\n／ 持续更新',
      highQuality: false,
      track: {
        name: '夜曲 (女声版)',
        id: 2078402083,
        position: 0,
        alias: [],
        status: 0,
        fee: 8,
        copyrightId: 743010,
        disc: '01',
        no: 1,
        artists: [
          {
            name: '王一只',
            id: 34642650,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '夜曲龙卷风',
          id: 173766232,
          idStr: null,
          type: 'Single',
          size: 2,
          picId: 109951168884425580,
          blurPicUrl:
            'http://p2.music.126.net/HuxNDvAYTvlu0SzAx-ecLg==/109951168884425588.jpg',
          companyId: 0,
          pic: 109951168884425580,
          picUrl:
            'http://p2.music.126.net/HuxNDvAYTvlu0SzAx-ecLg==/109951168884425588.jpg',
          publishTime: 1693411200000,
          description: '',
          tags: '',
          company: 'Change Records',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 743010,
          commentThreadId: 'R_AL_3_173766232',
          artists: [
            {
              name: '王一只',
              id: 34642650,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951168884425588'
        },
        starred: false,
        popularity: 95,
        score: 95,
        starredNum: 0,
        duration: 132931,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2078402083',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 8398493584,
          size: 2127874,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 132931,
          volumeDelta: -34195
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8398493582,
          size: 5319619,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 132931,
          volumeDelta: -38612
        },
        mMusic: {
          name: null,
          id: 8398493587,
          size: 3191789,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 132931,
          volumeDelta: -35964
        },
        lMusic: {
          name: null,
          id: 8398493584,
          size: 2127874,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 132931,
          volumeDelta: -34195
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 9138387502,
      name: '90，95后流行歌曲：周杰伦、林俊杰...',
      coverImgUrl:
        'http://p1.music.126.net/rVGwIEzF_LewKc1HPN8b0g==/109951169254203812.jpg',
      creator: {
        nickname: '执剑稳',
        userId: 290894929,
        userType: 4,
        avatarUrl:
          'http://p1.music.126.net/HD5ratSMCm5YQB7MmrQaTg==/109951167793405452.jpg',
        authStatus: 1,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 90,
      userId: 290894929,
      playCount: 2258,
      bookCount: 28,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=9138387502&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description:
        '当年的流行歌曲，不知不觉变成了耳机里的珍藏，只要在耳畔响起，就有种难以抵御的魔力，忍不住侧耳细听，仿佛里面铭刻的不是音符，而是情感、是故事、是每个想诉说却有所不出口的情愫。',
      highQuality: false,
      track: {
        name: '知足',
        id: 385965,
        position: 1,
        alias: [],
        status: 0,
        fee: 1,
        copyrightId: 684010,
        disc: '01',
        no: 1,
        artists: [
          {
            name: '五月天',
            id: 13193,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '知足 最真杰作选',
          id: 38247,
          idStr: null,
          type: '精选集',
          size: 30,
          picId: 109951163263882450,
          blurPicUrl:
            'http://p1.music.126.net/_B1Fn_Z1WxHzqGLzLZDf-w==/109951163263882447.jpg',
          companyId: 0,
          pic: 109951163263882450,
          picUrl:
            'http://p1.music.126.net/_B1Fn_Z1WxHzqGLzLZDf-w==/109951163263882447.jpg',
          publishTime: 1124985600000,
          description: '',
          tags: '',
          company: '滚石唱片',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: ['Just My Pride'],
          status: 1,
          copyrightId: 684010,
          commentThreadId: 'R_AL_3_38247',
          artists: [
            {
              name: '五月天',
              id: 13193,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951163263882447'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 256692,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '600902000008895935',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_385965',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 10929725,
        bMusic: {
          name: null,
          id: 8169464584,
          size: 4108164,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 256692,
          volumeDelta: -21342
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8169464583,
          size: 10270346,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 256692,
          volumeDelta: -25685
        },
        mMusic: {
          name: null,
          id: 8169464579,
          size: 6162225,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 256692,
          volumeDelta: -23064
        },
        lMusic: {
          name: null,
          id: 8169464584,
          size: 4108164,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 256692,
          volumeDelta: -21342
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 906055009,
      name: '林俊杰＋周杰伦＋陈奕迅＋薛之谦',
      coverImgUrl:
        'http://p1.music.126.net/DRcszq1_PwM1vBp70rDyKg==/18983068253887761.jpg',
      creator: {
        nickname: 'monicamorning',
        userId: 363223421,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/WxZrK8M05mw7u_OXNhdoUA==/109951163318305087.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 88,
      userId: 363223421,
      playCount: 3070604,
      bookCount: 37590,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=906055009&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description: '你和他的所有青春',
      highQuality: false,
      track: {
        name: '醉赤壁',
        id: 108478,
        position: 5,
        alias: ['网游《赤壁online game》主题曲'],
        status: 0,
        fee: 1,
        copyrightId: 22036,
        disc: '1',
        no: 5,
        artists: [
          {
            name: '林俊杰',
            id: 3684,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: 'JJ陆',
          id: 10770,
          idStr: null,
          type: '专辑',
          size: 14,
          picId: 109951168111262960,
          blurPicUrl:
            'http://p2.music.126.net/hClw_8dZJ1fq5L3SKI_oaA==/109951168111262960.jpg',
          companyId: 0,
          pic: 109951168111262960,
          picUrl:
            'http://p2.music.126.net/hClw_8dZJ1fq5L3SKI_oaA==/109951168111262960.jpg',
          publishTime: 1224259200000,
          description: '',
          tags: '',
          company: '海蝶（天津）文化传播有限公司',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 22036,
          commentThreadId: 'R_AL_3_10770',
          artists: [
            {
              name: '林俊杰',
              id: 3684,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951168111262960'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 281533,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '600902000001816629',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_108478',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 522352,
        bMusic: {
          name: null,
          id: 6723330581,
          size: 4505644,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 281533,
          volumeDelta: -42520
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 6723330577,
          size: 11264044,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 281533,
          volumeDelta: -46883
        },
        mMusic: {
          name: null,
          id: 6723330579,
          size: 6758444,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 281533,
          volumeDelta: -44267
        },
        lMusic: {
          name: null,
          id: 6723330581,
          size: 4505644,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 281533,
          volumeDelta: -42520
        },
        transNames: ['Tale Of The Red Cliff']
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 6946225463,
      name: '晴天-周杰伦经典和翻唱',
      coverImgUrl:
        'http://p1.music.126.net/7zYTedDj454B1UrribCU9g==/109951166337881939.jpg',
      creator: {
        nickname: '言若风',
        userId: 254051969,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/n-VgLjqPQ_7FVIiG1GjWLw==/109951165111336778.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 228,
      userId: 254051969,
      playCount: 4543051,
      bookCount: 15595,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=6946225463&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description: '周杰伦的经典歌曲和翻唱周杰伦的歌曲。',
      highQuality: false,
      track: {
        name: '反方向的钟 (温柔女声版)',
        id: 2105945210,
        position: 0,
        alias: [],
        status: 0,
        fee: 8,
        copyrightId: 743010,
        disc: '01',
        no: 1,
        artists: [
          {
            name: '王一只',
            id: 34642650,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '反方向的钟',
          id: 180520588,
          idStr: null,
          type: 'Single',
          size: 2,
          picId: 109951169140529760,
          blurPicUrl:
            'http://p2.music.126.net/04DekBvkogULJ06QhPf38A==/109951169140529752.jpg',
          companyId: 0,
          pic: 109951169140529760,
          picUrl:
            'http://p2.music.126.net/04DekBvkogULJ06QhPf38A==/109951169140529752.jpg',
          publishTime: 1701705600000,
          description: '',
          tags: '',
          company: '王一只',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 743010,
          commentThreadId: 'R_AL_3_180520588',
          artists: [
            {
              name: '王一只',
              id: 34642650,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951169140529752'
        },
        starred: false,
        popularity: 95,
        score: 95,
        starredNum: 0,
        duration: 215575,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2105945210',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 8635880723,
          size: 3450297,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 215575,
          volumeDelta: -48715
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8635880722,
          size: 8625676,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 215575,
          volumeDelta: -53037
        },
        mMusic: {
          name: null,
          id: 8635880721,
          size: 5175423,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 215575,
          volumeDelta: -50420
        },
        lMusic: {
          name: null,
          id: 8635880723,
          size: 3450297,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 215575,
          volumeDelta: -48715
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 7076978982,
      name: '周杰伦',
      coverImgUrl:
        'http://p1.music.126.net/MrEZldgbQY9Y345QbywayQ==/109951168907474736.jpg',
      creator: {
        nickname: '把情绪装进口袋',
        userId: 1356012325,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/4oJ5QWKQ7XYy-QZLodt53A==/109951169212103702.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 147,
      userId: 1356012325,
      playCount: 35757,
      bookCount: 23,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=7076978982&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description: null,
      highQuality: false,
      track: {
        name: '流浪诗人',
        id: 185703,
        position: 8,
        alias: [],
        status: 0,
        fee: 0,
        copyrightId: 1007,
        disc: '1',
        no: 8,
        artists: [
          {
            name: '周杰伦',
            id: 6452,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          {
            name: '杨瑞代',
            id: 6090,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '魔杰座',
          id: 18877,
          idStr: null,
          type: '专辑',
          size: 11,
          picId: 109951163200234830,
          blurPicUrl:
            'http://p1.music.126.net/HBanuZpt8SD2kf15AFa6Og==/109951163200234839.jpg',
          companyId: 0,
          pic: 109951163200234830,
          picUrl:
            'http://p1.music.126.net/HBanuZpt8SD2kf15AFa6Og==/109951163200234839.jpg',
          publishTime: 1224000000000,
          description: '',
          tags: '',
          company: '杰威尔',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: ['Capricorn'],
          status: 40,
          copyrightId: 1007,
          commentThreadId: 'R_AL_3_18877',
          artists: [
            {
              name: '周杰伦',
              id: 6452,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951163200234839'
        },
        starred: false,
        popularity: 90,
        score: 90,
        starredNum: 0,
        duration: 169000,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '600902000006889024',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_185703',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 0,
        mp3Url: null,
        mvid: 345068,
        bMusic: {
          name: null,
          id: 99230722,
          size: 2707164,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 169000,
          volumeDelta: -36367
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 99230720,
          size: 6767847,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 169000,
          volumeDelta: -40521
        },
        mMusic: {
          name: null,
          id: 99230721,
          size: 4060725,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 169000,
          volumeDelta: -37964
        },
        lMusic: {
          name: null,
          id: 99230722,
          size: 2707164,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 169000,
          volumeDelta: -36367
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"NameKeyword#Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 391174685,
      name: '林俊杰，周杰伦，王力宏，陶喆',
      coverImgUrl:
        'http://p1.music.126.net/6pIcF4ZAL5euujMUNSt8PQ==/109951164124479906.jpg',
      creator: {
        nickname: '焦糖小斯',
        userId: 276466718,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/BXj8jGrCBhPy1YRnVig-xA==/1384285151834371.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 182,
      userId: 276466718,
      playCount: 557473,
      bookCount: 6634,
      specialType: 300,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=391174685&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description: '',
      highQuality: false,
      track: {
        name: '天天',
        id: 150633,
        position: 10,
        alias: [],
        status: 0,
        fee: 1,
        copyrightId: 7002,
        disc: '01',
        no: 11,
        artists: [
          {
            name: '陶喆',
            id: 5196,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: "I'm O.K.",
          id: 15196,
          idStr: null,
          type: '专辑',
          size: 12,
          picId: 109951164124479900,
          blurPicUrl:
            'http://p1.music.126.net/6pIcF4ZAL5euujMUNSt8PQ==/109951164124479906.jpg',
          companyId: 0,
          pic: 109951164124479900,
          picUrl:
            'http://p1.music.126.net/6pIcF4ZAL5euujMUNSt8PQ==/109951164124479906.jpg',
          publishTime: 944755200000,
          description: '',
          tags: '',
          company: '华纳音乐',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 7002,
          commentThreadId: 'R_AL_3_15196',
          artists: [
            {
              name: '陶喆',
              id: 5196,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951164124479906'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 255200,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_150633',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 2,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 7566531015,
          size: 4084341,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 255200,
          volumeDelta: -42269
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 7566531016,
          size: 10210787,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 255200,
          volumeDelta: -46468
        },
        mMusic: {
          name: null,
          id: 7566531009,
          size: 6126489,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 255200,
          volumeDelta: -43878
        },
        lMusic: {
          name: null,
          id: 7566531015,
          size: 4084341,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 255200,
          volumeDelta: -42269
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 7070399884,
      name: 'Jay 周杰伦【完美歌单】',
      coverImgUrl:
        'http://p1.music.126.net/QUIZQgcyhE3ntkcilE2-sw==/109951166622342723.jpg',
      creator: {
        nickname: '周杰伦的BB机',
        userId: 415063370,
        userType: 200,
        avatarUrl:
          'http://p1.music.126.net/MYtQP8DMO6pbLKY5mM_zRA==/109951168969347766.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 604,
      userId: 415063370,
      playCount: 9042061,
      bookCount: 37956,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=7070399884&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: '8.5',
      description:
        '不是有爱的人就能在一起，不是一个拥抱，一句我想你了，我在等你回家，他就回来了，他或许已经再也不会回来了。',
      highQuality: false,
      track: {
        name: '龙卷风',
        id: 2090220563,
        position: 0,
        alias: [],
        status: 0,
        fee: 0,
        copyrightId: 743010,
        disc: '01',
        no: 3,
        artists: [
          {
            name: '何一恒',
            id: 52069353,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '晴天龙卷风',
          id: 176653379,
          idStr: null,
          type: 'Single',
          size: 3,
          picId: 109951168977348690,
          blurPicUrl:
            'http://p2.music.126.net/LKwgsCQk9LQwiYOkrrCjqg==/109951168977348693.jpg',
          companyId: 0,
          pic: 109951168977348690,
          picUrl:
            'http://p2.music.126.net/LKwgsCQk9LQwiYOkrrCjqg==/109951168977348693.jpg',
          publishTime: 1696953600000,
          description: '',
          tags: '',
          company: '何一恒',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 743010,
          commentThreadId: 'R_AL_3_176653379',
          artists: [
            {
              name: '何一恒',
              id: 52069353,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951168977348693'
        },
        starred: false,
        popularity: 95,
        score: 95,
        starredNum: 0,
        duration: 113380,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: '',
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_2090220563',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 0,
        bMusic: {
          name: null,
          id: 8500465792,
          size: 1815240,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 113380,
          volumeDelta: -38348
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8500465795,
          size: 4538036,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 113380,
          volumeDelta: -42756
        },
        mMusic: {
          name: null,
          id: 8500465798,
          size: 2722839,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 113380,
          volumeDelta: -40137
        },
        lMusic: {
          name: null,
          id: 8500465792,
          size: 1815240,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 113380,
          volumeDelta: -38348
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 2901724448,
      name: '七里香(周杰伦)',
      coverImgUrl:
        'http://p1.music.126.net/tGHU62DTszbFQ37W9qPHcg==/2002210674180197.jpg',
      creator: {
        nickname: 'muhpul0809',
        userId: 409442703,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/tkOM4QS_vOq4eiyZ-rPZJQ==/109951164610446768.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 159,
      userId: 409442703,
      playCount: 1211073,
      bookCount: 7327,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=2901724448&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description: null,
      highQuality: false,
      track: {
        name: '追光者',
        id: 483671599,
        position: 3,
        alias: ['电视剧《夏至未至》插曲'],
        status: 0,
        fee: 1,
        copyrightId: 1416401,
        disc: '01',
        no: 5,
        artists: [
          {
            name: '岑宁儿',
            id: 7409,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '夏至未至 影视原声带',
          id: 35644242,
          idStr: null,
          type: '专辑',
          size: 8,
          picId: 19149094509535910,
          blurPicUrl:
            'http://p2.music.126.net/ZZAQGWl9mR7g5xCyWWH3Pw==/19149094509535913.jpg',
          companyId: 0,
          pic: 19149094509535910,
          picUrl:
            'http://p2.music.126.net/ZZAQGWl9mR7g5xCyWWH3Pw==/19149094509535913.jpg',
          publishTime: 1497801600007,
          description: '',
          tags: '',
          company: '听见时代',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: [],
          status: 1,
          copyrightId: 414012,
          commentThreadId: 'R_AL_3_35644242',
          artists: [
            {
              name: '群星',
              id: 122455,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '19149094509535913'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 235833,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: null,
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_483671599',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 2,
        mp3Url: null,
        mvid: 5563801,
        bMusic: {
          name: null,
          id: 8169462960,
          size: 3774215,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 235833,
          volumeDelta: -39816
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 8169462957,
          size: 9435472,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 235833,
          volumeDelta: -44120
        },
        mMusic: {
          name: null,
          id: 8169462961,
          size: 5661301,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 235833,
          volumeDelta: -41517
        },
        lMusic: {
          name: null,
          id: 8169462960,
          size: 3774215,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 235833,
          volumeDelta: -39816
        }
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    },
    {
      id: 4936445997,
      name: '周杰伦 林俊杰',
      coverImgUrl:
        'http://p1.music.126.net/uyayqUPgHhu8sx9yS0jgbQ==/109951166688811292.jpg',
      creator: {
        nickname: '今天你听歌了没a',
        userId: 1749411807,
        userType: 0,
        avatarUrl:
          'http://p1.music.126.net/LFYwwlDFNuhcvbtwF9txiQ==/109951165594870085.jpg',
        authStatus: 0,
        expertTags: null,
        experts: null
      },
      subscribed: false,
      trackCount: 81,
      userId: 1749411807,
      playCount: 1918615,
      bookCount: 15694,
      specialType: 0,
      officialTags: null,
      action:
        'orpheus://nm/playlist/detail?id=4936445997&autoplay=&referLog=&anchoredSongID=',
      actionType: 'orpheus',
      recommendText: null,
      score: null,
      description:
        '越长大越成熟你终会发现，你缺的不是异性，而是一个可以沟通的灵魂',
      highQuality: false,
      track: {
        name: '生生',
        id: 29850685,
        position: 11,
        alias: ['The Beacon'],
        status: 0,
        fee: 1,
        copyrightId: 7002,
        disc: '1',
        no: 11,
        artists: [
          {
            name: '林俊杰',
            id: 3684,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          }
        ],
        album: {
          name: '新地球 - 人 (Special Edition)',
          id: 3056951,
          idStr: null,
          type: '专辑',
          size: 13,
          picId: 109951166919095170,
          blurPicUrl:
            'http://p2.music.126.net/QXZRckFTN5375vdQSyG0jA==/109951166919095160.jpg',
          companyId: 0,
          pic: 109951166919095170,
          picUrl:
            'http://p2.music.126.net/QXZRckFTN5375vdQSyG0jA==/109951166919095160.jpg',
          publishTime: 1422460800000,
          description: '',
          tags: '',
          company: '华纳音乐',
          briefDesc: '',
          artist: {
            name: '',
            id: 0,
            picId: 0,
            img1v1Id: 0,
            briefDesc: '',
            picUrl: '',
            img1v1Url:
              'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            albumSize: 0,
            alias: [],
            trans: '',
            musicSize: 0,
            topicPerson: 0
          },
          songs: [],
          alias: ['GENESIS'],
          status: 1,
          copyrightId: 7002,
          commentThreadId: 'R_AL_3_3056951',
          artists: [
            {
              name: '林俊杰',
              id: 3684,
              picId: 0,
              img1v1Id: 0,
              briefDesc: '',
              picUrl: '',
              img1v1Url:
                'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
              albumSize: 0,
              alias: [],
              trans: '',
              musicSize: 0,
              topicPerson: 0
            }
          ],
          onSale: false,
          picId_str: '109951166919095160'
        },
        starred: false,
        popularity: 100,
        score: 100,
        starredNum: 0,
        duration: 258360,
        playedNum: 0,
        dayPlays: 0,
        hearTime: 0,
        ringtone: null,
        crbt: null,
        audition: null,
        copyFrom: '',
        commentThreadId: 'R_SO_4_29850685',
        rtUrl: null,
        ftype: 0,
        rtUrls: [],
        copyright: 1,
        mp3Url: null,
        mvid: 415121,
        bMusic: {
          name: null,
          id: 7565080135,
          size: 4134914,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 258360,
          volumeDelta: -65463
        },
        rtype: 0,
        rurl: null,
        hMusic: {
          name: null,
          id: 7565080133,
          size: 10337219,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 320000,
          playTime: 258360,
          volumeDelta: -69732
        },
        mMusic: {
          name: null,
          id: 7565080138,
          size: 6202349,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 192000,
          playTime: 258360,
          volumeDelta: -67179
        },
        lMusic: {
          name: null,
          id: 7565080135,
          size: 4134914,
          extension: 'mp3',
          sr: 44100,
          dfsId: 0,
          bitrate: 128000,
          playTime: 258360,
          volumeDelta: -65463
        },
        transNames: ['The Beacon']
      },
      alg: 'alg_search_rec_playlist_tab_hotartist_rewrite_{"hit":"Name","id":"周杰伦","type":"hotartist"}'
    }
  ]
}

export const trackSlice = createSlice({
  name: 'track',
  initialState: {
    // artists: [], //歌手
    // albums: [], //专辑
    // songs: [], //单曲
    // playlists: [] //歌单
    artists: result.artists, //歌手
    albums: result.albums, //专辑
    songs: result.songs, //单曲
    playlists: result.playlists //歌单
  },
  reducers: {
    changeArtists(state, { payload }) {
      state.artists = payload
    },
    changeAlbums(state, { payload }) {
      state.albums = payload
    },
    changeSongs(state, { payload }) {
      state.songs = payload
    },
    changePlaylists(state, { payload }) {
      state.playlists = payload
    },
    changeTrackData(state, { payload }) {
      console.log(`payload:`, payload)

      if (!Array.isArray(payload)) return

      payload.forEach(({ key, value }) => {
        state[key] = value
      })
    }
  }
})

export const {
  changeArtists,
  changeAlbums,
  changeSongs,
  changePlaylists,
  changeTrackData
} = trackSlice.actions

export default trackSlice.reducer
