module ApplicationHelper
  def default_meta_tags
    {
        site: "COULEURS",
        title: "好きな色でプロフィールをシェアしよう",
        reverse: true,
        charset: 'utf-8',
        description: '『COULEURS』は自分の好きな色とその色でプロフィールをシェアするサービスです。',
        keywords: '好きな色',
        canonical: request.original_url,
        separator: '|',
        icon:[
            {href: image_url("favicon.ico")},
            {href: image_url("Icon.png"), rel: 'apple-touch-icon', sizes: '180x180', type: 'image/png'},
        ],
        og:{
            site_name: 'COULEURS',
            title: "好きな色でプロフィールをシェアしよう",
            description: '『COULEURS』は自分の好きな色とその色でプロフィールをシェアするサービスです。',
            type: "website",
            url: request.original_url,
            image: image_url("Icon.png"),
            locale: 'ja-JP'
        },
        twitter:{
            card: 'summary',
            site: '@AkioMabuchi'
        },
        viewport: 'width=device-width, initial-scale=0.8'
    }
  end
end
