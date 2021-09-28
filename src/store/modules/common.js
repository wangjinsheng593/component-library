
const download = {
    actions: {
        downloadData({ commit, state }, data) {
            return new Promise((resolve, reject) => {
                data.event(data.formData).then(res => {
                    const blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel'
                    })
                    const objectUrl = URL.createObjectURL(blob)
                    const link = document.createElement('a') // 创建a标签
                    link.href = objectUrl
                    // 重命名文件
                    link.download = res.headers['content-disposition'].split(
                        '='
                    )[1]
                    link.click()
                    URL.revokeObjectURL(objectUrl)
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })
        }

    }

}

export default download
